import express from 'express'
import Review from '../models/Review.js'
import { authenticate } from '../middleware/auth.js'

const router = express.Router()

// Get approved reviews
router.get('/', async (req, res) => {
  try {
    const { limit = 10, approved } = req.query
    const where = {}
    
    // If approved query param is provided, filter by it, otherwise default to approved only
    if (approved !== undefined) {
      where.is_approved = approved === 'true'
    } else {
      where.is_approved = true
    }
    
    const reviews = await Review.findAll({
      where,
      order: [['created_at', 'DESC']],
      limit: parseInt(limit)
    })
    res.json(reviews)
  } catch (error) {
    console.error('Get reviews error:', error)
    res.status(500).json({ message: 'Failed to fetch reviews', error: error.message })
  }
})

// Submit a review/feedback
router.post('/', async (req, res) => {
  try {
    const { rating, comment, customer_name } = req.body
    
    // Validation
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' })
    }
    
    if (!comment || comment.trim().length < 10) {
      return res.status(400).json({ message: 'Comment must be at least 10 characters long' })
    }
    
    const review = await Review.create({
      rating: parseInt(rating),
      comment: comment.trim(),
      customer_name: customer_name?.trim() || null,
      is_approved: false // Reviews need admin approval
    })
    
    res.status(201).json({
      message: 'Thank you for your feedback! Your review will be reviewed before being published.',
      review
    })
  } catch (error) {
    console.error('Create review error:', error)
    res.status(500).json({ message: 'Failed to submit review', error: error.message })
  }
})

export default router

