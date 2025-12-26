import express from 'express'
import { Sequelize } from 'sequelize'
import { authenticate, isAdmin } from '../middleware/auth.js'
import Order from '../models/Order.js'
import MenuItem from '../models/MenuItem.js'
import Reservation from '../models/Reservation.js'
import User from '../models/User.js'
import OrderItem from '../models/OrderItem.js'

const router = express.Router()

// All admin routes require authentication and admin role
router.use(authenticate)
router.use(isAdmin)

// Dashboard stats
router.get('/dashboard', async (req, res) => {
  try {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const todayOrders = await Order.count({
      where: {
        created_at: {
          [Sequelize.Op.gte]: today
        }
      }
    })
    
    const todayRevenue = await Order.sum('total', {
      where: {
        created_at: {
          [Sequelize.Op.gte]: today
        },
        status: ['completed', 'ready']
      }
    })
    
    const pendingOrders = await Order.count({
      where: { status: 'pending' }
    })
    
    const pendingReservations = await Reservation.count({
      where: { status: 'pending' }
    })
    
    res.json({
      todayOrders,
      todayRevenue: todayRevenue || 0,
      pendingOrders,
      pendingReservations
    })
  } catch (error) {
    console.error('Dashboard stats error:', error)
    res.status(500).json({ message: 'Failed to fetch dashboard stats', error: error.message })
  }
})

// Order management
router.get('/orders', async (req, res) => {
  try {
    const { status, limit = 50 } = req.query
    const where = {}
    if (status) {
      where.status = status
    }
    
    const orders = await Order.findAll({
      where,
      include: [{
        model: OrderItem,
        as: 'items',
        include: [{
          model: MenuItem,
          as: 'menuItem'
        }]
      }],
      order: [['created_at', 'DESC']],
      limit: parseInt(limit)
    })
    res.json(orders)
  } catch (error) {
    console.error('Get admin orders error:', error)
    res.status(500).json({ message: 'Failed to fetch orders', error: error.message })
  }
})

router.put('/orders/:id/status', async (req, res) => {
  try {
    const { status } = req.body
    const order = await Order.findByPk(req.params.id)
    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }
    order.status = status
    await order.save()
    res.json(order)
  } catch (error) {
    console.error('Update order status error:', error)
    res.status(500).json({ message: 'Failed to update order status', error: error.message })
  }
})

// Menu management
router.post('/menu', async (req, res) => {
  try {
    const menuItem = await MenuItem.create(req.body)
    res.status(201).json(menuItem)
  } catch (error) {
    console.error('Create menu item error:', error)
    res.status(500).json({ message: 'Failed to create menu item', error: error.message })
  }
})

router.put('/menu/:id', async (req, res) => {
  try {
    const menuItem = await MenuItem.findByPk(req.params.id)
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' })
    }
    await menuItem.update(req.body)
    res.json(menuItem)
  } catch (error) {
    console.error('Update menu item error:', error)
    res.status(500).json({ message: 'Failed to update menu item', error: error.message })
  }
})

router.delete('/menu/:id', async (req, res) => {
  try {
    const menuItem = await MenuItem.findByPk(req.params.id)
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' })
    }
    await menuItem.destroy()
    res.json({ message: 'Menu item deleted successfully' })
  } catch (error) {
    console.error('Delete menu item error:', error)
    res.status(500).json({ message: 'Failed to delete menu item', error: error.message })
  }
})

// Reservation management
router.get('/reservations', async (req, res) => {
  try {
    const reservations = await Reservation.findAll({
      order: [['date', 'ASC'], ['time', 'ASC']]
    })
    res.json(reservations)
  } catch (error) {
    console.error('Get admin reservations error:', error)
    res.status(500).json({ message: 'Failed to fetch reservations', error: error.message })
  }
})

router.put('/reservations/:id/status', async (req, res) => {
  try {
    const { status } = req.body
    const reservation = await Reservation.findByPk(req.params.id)
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' })
    }
    reservation.status = status
    await reservation.save()
    res.json(reservation)
  } catch (error) {
    console.error('Update reservation status error:', error)
    res.status(500).json({ message: 'Failed to update reservation status', error: error.message })
  }
})

// User management
router.get('/users', async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password_hash'] },
      order: [['created_at', 'DESC']]
    })
    res.json(users)
  } catch (error) {
    console.error('Get users error:', error)
    res.status(500).json({ message: 'Failed to fetch users', error: error.message })
  }
})

router.put('/users/:id/vip', async (req, res) => {
  try {
    const { vip_status } = req.body
    const user = await User.findByPk(req.params.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    user.vip_status = vip_status
    if (vip_status && !user.vip_joined_at) {
      user.vip_joined_at = new Date()
    }
    await user.save()
    res.json(user)
  } catch (error) {
    console.error('Update VIP status error:', error)
    res.status(500).json({ message: 'Failed to update VIP status', error: error.message })
  }
})

export default router

