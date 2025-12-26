import express from 'express'
import { authenticate } from '../middleware/auth.js'
import Order from '../models/Order.js'
import OrderItem from '../models/OrderItem.js'
import MenuItem from '../models/MenuItem.js'
import { getRecommendations } from '../services/recommendations.js'

const router = express.Router()

router.get('/you-may-also-like', authenticate, async (req, res) => {
  try {
    // Get user's order history
    const orders = await Order.findAll({
      where: { user_id: req.user.id, status: 'completed' },
      include: [{
        model: OrderItem,
        as: 'items',
        include: [{
          model: MenuItem,
          as: 'menuItem'
        }]
      }],
      limit: 20,
      order: [['created_at', 'DESC']]
    })
    
    // Get all available menu items
    const allMenuItems = await MenuItem.findAll({
      where: { is_available: true }
    })
    
    // Get recommendations
    const recommendations = await getRecommendations(
      req.user.id,
      orders,
      allMenuItems
    )
    
    res.json(recommendations)
  } catch (error) {
    console.error('Get recommendations error:', error)
    res.status(500).json({ message: 'Failed to get recommendations', error: error.message })
  }
})

export default router



