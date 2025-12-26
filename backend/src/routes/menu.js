import express from 'express'
import MenuItem from '../models/MenuItem.js'

const router = express.Router()

// Get all menu items
router.get('/', async (req, res) => {
  try {
    const { category, vip_only } = req.query
    const where = {}
    
    if (category) {
      where.category = category
    }
    
    if (vip_only === 'true') {
      where.is_vip_only = true
    }
    
    where.is_available = true
    
    const items = await MenuItem.findAll({ where, order: [['category', 'ASC'], ['name', 'ASC']] })
    res.json(items)
  } catch (error) {
    console.error('Get menu items error:', error)
    res.status(500).json({ message: 'Failed to fetch menu items', error: error.message })
  }
})

// Get single menu item
router.get('/:id', async (req, res) => {
  try {
    const item = await MenuItem.findByPk(req.params.id)
    if (!item) {
      return res.status(404).json({ message: 'Menu item not found' })
    }
    res.json(item)
  } catch (error) {
    console.error('Get menu item error:', error)
    res.status(500).json({ message: 'Failed to fetch menu item', error: error.message })
  }
})

export default router

