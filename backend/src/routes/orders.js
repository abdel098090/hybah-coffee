import express from 'express'
import { authenticate } from '../middleware/auth.js'
import Order from '../models/Order.js'
import OrderItem from '../models/OrderItem.js'
import MenuItem from '../models/MenuItem.js'
import { createPaymentIntent } from '../services/payment.js'
import { awardPointsForOrder } from './loyalty.js'
import { sendOrderConfirmation } from '../services/email.js'

const router = express.Router()

// Get user's orders
router.get('/', authenticate, async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { user_id: req.user.id },
      include: [{
        model: OrderItem,
        as: 'items',
        include: [{
          model: MenuItem,
          as: 'menuItem'
        }]
      }],
      order: [['created_at', 'DESC']]
    })
    res.json(orders)
  } catch (error) {
    console.error('Get orders error:', error)
    res.status(500).json({ message: 'Failed to fetch orders', error: error.message })
  }
})

// Get single order
router.get('/:id', authenticate, async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      include: [{
        model: OrderItem,
        as: 'items',
        include: [{
          model: MenuItem,
          as: 'menuItem'
        }]
      }]
    })
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }
    
    // Check if user owns the order or is admin
    if (order.user_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' })
    }
    
    res.json(order)
  } catch (error) {
    console.error('Get order error:', error)
    res.status(500).json({ message: 'Failed to fetch order', error: error.message })
  }
})

// Create payment intent
router.post('/create-payment-intent', authenticate, async (req, res) => {
  try {
    const { amount } = req.body
    const paymentIntent = await createPaymentIntent(amount, 'usd', {
      userId: req.user.id.toString()
    })
    res.json({ clientSecret: paymentIntent.client_secret })
  } catch (error) {
    console.error('Create payment intent error:', error)
    res.status(500).json({ message: 'Failed to create payment intent', error: error.message })
  }
})

// Create order
router.post('/', authenticate, async (req, res) => {
  try {
    const { items, delivery_type, delivery_address, delivery_fee } = req.body
    
    // Calculate total
    let total = 0
    for (const item of items) {
      const menuItem = await MenuItem.findByPk(item.menu_item_id)
      if (!menuItem) {
        return res.status(400).json({ message: `Menu item ${item.menu_item_id} not found` })
      }
      total += parseFloat(menuItem.price) * item.quantity
    }
    total += parseFloat(delivery_fee || 0)
    
    const order = await Order.create({
      user_id: req.user.id,
      total,
      delivery_type,
      delivery_address,
      delivery_fee: delivery_fee || 0,
      status: 'pending',
      estimated_time: 20
    })
    
    // Create order items
    for (const item of items) {
      const menuItem = await MenuItem.findByPk(item.menu_item_id)
      await OrderItem.create({
        order_id: order.id,
        menu_item_id: item.menu_item_id,
        quantity: item.quantity,
        price: menuItem.price,
        customizations: item.customizations || {}
      })
    }
    
    const orderWithItems = await Order.findByPk(order.id, {
      include: [{
        model: OrderItem,
        as: 'items',
        include: [{
          model: MenuItem,
          as: 'menuItem'
        }]
      }]
    })
    
    // Award loyalty points
    if (order.status !== 'cancelled') {
      await awardPointsForOrder(req.user.id, parseFloat(order.total))
    }
    
    // Send order confirmation email (if email service is configured)
    try {
      if (req.user.email) {
        await sendOrderConfirmation(req.user.email, {
          id: order.id,
          total: order.total,
          status: order.status,
          estimated_time: order.estimated_time
        })
      }
    } catch (emailError) {
      console.error('Failed to send order confirmation email:', emailError)
      // Don't fail the order if email fails
    }
    
    res.status(201).json(orderWithItems)
  } catch (error) {
    console.error('Create order error:', error)
    res.status(500).json({ message: 'Failed to create order', error: error.message })
  }
})

export default router

