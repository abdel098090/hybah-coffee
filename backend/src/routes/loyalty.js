import express from 'express'
import { authenticate } from '../middleware/auth.js'
import LoyaltyPoints from '../models/LoyaltyPoints.js'
import LoyaltyTransaction from '../models/LoyaltyTransaction.js'
import User from '../models/User.js'

const router = express.Router()

// Get user's loyalty points
router.get('/points', authenticate, async (req, res) => {
  try {
    let loyaltyPoints = await LoyaltyPoints.findOne({ where: { user_id: req.user.id } })
    
    if (!loyaltyPoints) {
      loyaltyPoints = await LoyaltyPoints.create({
        user_id: req.user.id,
        points: 0
      })
    }
    
    res.json(loyaltyPoints)
  } catch (error) {
    console.error('Get loyalty points error:', error)
    res.status(500).json({ message: 'Failed to fetch loyalty points', error: error.message })
  }
})

// Get loyalty transaction history
router.get('/transactions', authenticate, async (req, res) => {
  try {
    const transactions = await LoyaltyTransaction.findAll({
      where: { user_id: req.user.id },
      order: [['created_at', 'DESC']],
      limit: 50
    })
    res.json(transactions)
  } catch (error) {
    console.error('Get loyalty transactions error:', error)
    res.status(500).json({ message: 'Failed to fetch transactions', error: error.message })
  }
})

// Redeem points (simplified - returns discount amount)
router.post('/redeem', authenticate, async (req, res) => {
  try {
    const { points } = req.body
    
    if (!points || points < 100) {
      return res.status(400).json({ message: 'Minimum 100 points required to redeem' })
    }
    
    let loyaltyPoints = await LoyaltyPoints.findOne({ where: { user_id: req.user.id } })
    
    if (!loyaltyPoints || loyaltyPoints.points < points) {
      return res.status(400).json({ message: 'Insufficient points' })
    }
    
    // 100 points = $1 discount
    const discountAmount = points / 100
    
    loyaltyPoints.points -= points
    loyaltyPoints.total_redeemed += points
    await loyaltyPoints.save()
    
    await LoyaltyTransaction.create({
      user_id: req.user.id,
      points: -points,
      transaction_type: 'redeemed',
      description: `Redeemed ${points} points for $${discountAmount.toFixed(2)} discount`
    })
    
    res.json({
      message: 'Points redeemed successfully',
      discountAmount,
      remainingPoints: loyaltyPoints.points
    })
  } catch (error) {
    console.error('Redeem points error:', error)
    res.status(500).json({ message: 'Failed to redeem points', error: error.message })
  }
})

// Helper function to award points after order (called from order route)
export const awardPointsForOrder = async (userId, orderTotal) => {
  try {
    // Award 1 point per dollar spent
    const pointsEarned = Math.floor(orderTotal)
    
    let loyaltyPoints = await LoyaltyPoints.findOne({ where: { user_id: userId } })
    
    if (!loyaltyPoints) {
      loyaltyPoints = await LoyaltyPoints.create({
        user_id: userId,
        points: pointsEarned,
        total_earned: pointsEarned
      })
    } else {
      loyaltyPoints.points += pointsEarned
      loyaltyPoints.total_earned += pointsEarned
      await loyaltyPoints.save()
    }
    
    await LoyaltyTransaction.create({
      user_id: userId,
      points: pointsEarned,
      transaction_type: 'earned',
      description: `Earned ${pointsEarned} points from order`
    })
    
    return pointsEarned
  } catch (error) {
    console.error('Award points error:', error)
    return 0
  }
}

export default router



