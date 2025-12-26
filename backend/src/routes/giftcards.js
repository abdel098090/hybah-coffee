import express from 'express'
import { authenticate } from '../middleware/auth.js'
import GiftCard from '../models/GiftCard.js'
import { createPaymentIntent } from '../services/payment.js'

const router = express.Router()

// Purchase a gift card
router.post('/purchase', authenticate, async (req, res) => {
  try {
    const { amount, recipient_email } = req.body
    
    if (!amount || amount < 5) {
      return res.status(400).json({ message: 'Minimum gift card amount is $5' })
    }
    
    // In a real implementation, you would process payment here
    // For now, we'll create the gift card directly
    
    const giftCard = await GiftCard.create({
      amount: parseFloat(amount),
      balance: parseFloat(amount),
      purchased_by: req.user.id,
      purchased_for_email: recipient_email || req.user.email,
      expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // 1 year from now
    })
    
    res.status(201).json({
      message: 'Gift card purchased successfully',
      giftCard: {
        code: giftCard.code,
        amount: giftCard.amount,
        expires_at: giftCard.expires_at
      }
    })
  } catch (error) {
    console.error('Purchase gift card error:', error)
    res.status(500).json({ message: 'Failed to purchase gift card', error: error.message })
  }
})

// Get user's gift cards
router.get('/my-cards', authenticate, async (req, res) => {
  try {
    const giftCards = await GiftCard.findAll({
      where: {
        redeemed_by: req.user.id,
        status: 'active'
      },
      order: [['created_at', 'DESC']]
    })
    res.json(giftCards)
  } catch (error) {
    console.error('Get gift cards error:', error)
    res.status(500).json({ message: 'Failed to fetch gift cards', error: error.message })
  }
})

// Validate and redeem gift card
router.post('/redeem', authenticate, async (req, res) => {
  try {
    const { code } = req.body
    
    if (!code) {
      return res.status(400).json({ message: 'Gift card code is required' })
    }
    
    const giftCard = await GiftCard.findOne({ where: { code: code.toUpperCase() } })
    
    if (!giftCard) {
      return res.status(404).json({ message: 'Invalid gift card code' })
    }
    
    if (giftCard.status !== 'active') {
      return res.status(400).json({ message: 'Gift card is not active' })
    }
    
    if (giftCard.expires_at && new Date(giftCard.expires_at) < new Date()) {
      giftCard.status = 'expired'
      await giftCard.save()
      return res.status(400).json({ message: 'Gift card has expired' })
    }
    
    if (parseFloat(giftCard.balance) <= 0) {
      return res.status(400).json({ message: 'Gift card has no balance' })
    }
    
    // Associate with user (don't fully redeem yet - will be used during checkout)
    giftCard.redeemed_by = req.user.id
    
    res.json({
      message: 'Gift card validated successfully',
      giftCard: {
        code: giftCard.code,
        balance: giftCard.balance
      }
    })
  } catch (error) {
    console.error('Redeem gift card error:', error)
    res.status(500).json({ message: 'Failed to redeem gift card', error: error.message })
  }
})

// Apply gift card to order (will be called during checkout)
export const applyGiftCardToOrder = async (code, orderTotal) => {
  try {
    const giftCard = await GiftCard.findOne({ where: { code: code.toUpperCase() } })
    
    if (!giftCard || giftCard.status !== 'active') {
      return { success: false, message: 'Invalid gift card' }
    }
    
    if (parseFloat(giftCard.balance) <= 0) {
      return { success: false, message: 'Gift card has no balance' }
    }
    
    const balance = parseFloat(giftCard.balance)
    const discount = Math.min(balance, orderTotal)
    const newBalance = balance - discount
    
    giftCard.balance = newBalance
    if (newBalance <= 0) {
      giftCard.status = 'redeemed'
      giftCard.redeemed_at = new Date()
    }
    await giftCard.save()
    
    return {
      success: true,
      discountAmount: discount,
      remainingBalance: newBalance
    }
  } catch (error) {
    console.error('Apply gift card error:', error)
    return { success: false, message: 'Failed to apply gift card' }
  }
}

export default router



