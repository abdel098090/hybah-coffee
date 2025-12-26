import express from 'express'
import { authenticate } from '../middleware/auth.js'
import Reservation from '../models/Reservation.js'

const router = express.Router()

// Get user's reservations
router.get('/', authenticate, async (req, res) => {
  try {
    const reservations = await Reservation.findAll({
      where: { user_id: req.user.id },
      order: [['date', 'DESC'], ['time', 'DESC']]
    })
    res.json(reservations)
  } catch (error) {
    console.error('Get reservations error:', error)
    res.status(500).json({ message: 'Failed to fetch reservations', error: error.message })
  }
})

// Create reservation
router.post('/', authenticate, async (req, res) => {
  try {
    const { date, time, guests, seating_type, special_requests } = req.body
    
    // Basic validation
    if (!date || !time || !guests || !seating_type) {
      return res.status(400).json({ message: 'Missing required fields' })
    }
    
    // Check for conflicts (simplified - would need more complex logic in production)
    const existing = await Reservation.findOne({
      where: {
        date,
        time,
        status: ['pending', 'confirmed']
      }
    })
    
    if (existing) {
      return res.status(400).json({ message: 'Time slot already reserved' })
    }
    
    const reservation = await Reservation.create({
      user_id: req.user.id,
      date,
      time,
      guests,
      seating_type,
      special_requests,
      customer_name: `${req.user.first_name} ${req.user.last_name}`,
      customer_email: req.user.email,
      customer_phone: req.user.phone,
      status: 'pending'
    })
    
    res.status(201).json(reservation)
  } catch (error) {
    console.error('Create reservation error:', error)
    res.status(500).json({ message: 'Failed to create reservation', error: error.message })
  }
})

export default router

