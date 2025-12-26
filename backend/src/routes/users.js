import express from 'express'
import { authenticate } from '../middleware/auth.js'
import Address from '../models/Address.js'

const router = express.Router()

// Get user addresses
router.get('/addresses', authenticate, async (req, res) => {
  try {
    const addresses = await Address.findAll({
      where: { user_id: req.user.id },
      order: [['is_default', 'DESC'], ['created_at', 'DESC']]
    })
    res.json(addresses)
  } catch (error) {
    console.error('Get addresses error:', error)
    res.status(500).json({ message: 'Failed to fetch addresses', error: error.message })
  }
})

// Create address
router.post('/addresses', authenticate, async (req, res) => {
  try {
    const { address_line1, address_line2, city, state, zip_code, country, label, is_default } = req.body
    
    if (is_default) {
      // Unset other default addresses
      await Address.update(
        { is_default: false },
        { where: { user_id: req.user.id } }
      )
    }
    
    const address = await Address.create({
      user_id: req.user.id,
      address_line1,
      address_line2,
      city,
      state,
      zip_code,
      country: country || 'USA',
      label,
      is_default: is_default || false
    })
    
    res.status(201).json(address)
  } catch (error) {
    console.error('Create address error:', error)
    res.status(500).json({ message: 'Failed to create address', error: error.message })
  }
})

export default router

