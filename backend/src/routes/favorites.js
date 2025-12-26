import express from 'express'
import { authenticate } from '../middleware/auth.js'
import FavoriteItem from '../models/FavoriteItem.js'
import MenuItem from '../models/MenuItem.js'

const router = express.Router()

// Get user's favorite items
router.get('/', authenticate, async (req, res) => {
  try {
    const favorites = await FavoriteItem.findAll({
      where: { user_id: req.user.id },
      include: [{
        model: MenuItem,
        as: 'menuItem'
      }]
    })
    res.json(favorites.map(fav => fav.menuItem))
  } catch (error) {
    console.error('Get favorites error:', error)
    res.status(500).json({ message: 'Failed to fetch favorites', error: error.message })
  }
})

// Add to favorites
router.post('/:menuItemId', authenticate, async (req, res) => {
  try {
    const menuItem = await MenuItem.findByPk(req.params.menuItemId)
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' })
    }
    
    const [favorite, created] = await FavoriteItem.findOrCreate({
      where: {
        user_id: req.user.id,
        menu_item_id: req.params.menuItemId
      }
    })
    
    if (created) {
      res.status(201).json({ message: 'Added to favorites', favorite })
    } else {
      res.json({ message: 'Already in favorites', favorite })
    }
  } catch (error) {
    console.error('Add favorite error:', error)
    res.status(500).json({ message: 'Failed to add favorite', error: error.message })
  }
})

// Remove from favorites
router.delete('/:menuItemId', authenticate, async (req, res) => {
  try {
    const deleted = await FavoriteItem.destroy({
      where: {
        user_id: req.user.id,
        menu_item_id: req.params.menuItemId
      }
    })
    
    if (deleted) {
      res.json({ message: 'Removed from favorites' })
    } else {
      res.status(404).json({ message: 'Favorite not found' })
    }
  } catch (error) {
    console.error('Remove favorite error:', error)
    res.status(500).json({ message: 'Failed to remove favorite', error: error.message })
  }
})

export default router



