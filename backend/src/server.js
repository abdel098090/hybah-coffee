import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { sequelize } from './config/database.js'
import './models/index.js' // Import models to register associations
import authRoutes from './routes/auth.js'
import menuRoutes from './routes/menu.js'
import orderRoutes from './routes/orders.js'
import reservationRoutes from './routes/reservations.js'
import adminRoutes from './routes/admin.js'
import userRoutes from './routes/users.js'
import reviewRoutes from './routes/reviews.js'
import loyaltyRoutes from './routes/loyalty.js'
import giftCardRoutes from './routes/giftcards.js'
import favoriteRoutes from './routes/favorites.js'
import recommendationRoutes from './routes/recommendations.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true)
    
    // Allow all localhost ports for development
    if (origin.match(/^http:\/\/localhost:\d+$/)) {
      return callback(null, true)
    }
    
    // Allow Vercel preview and production domains
    if (origin.match(/^https:\/\/.*\.vercel\.app$/)) {
      return callback(null, true)
    }
    
    // Allow the configured FRONTEND_URL
    const allowedOrigins = [
      process.env.FRONTEND_URL || 'http://localhost:3000',
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:3002',
      'http://localhost:3003',
      // Add your production frontend URL here
      ...(process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : [])
    ]
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      // In production, log but allow if it's a known pattern
      if (process.env.NODE_ENV === 'production') {
        console.warn(`CORS: Unknown origin: ${origin}`)
        // Allow Vercel domains in production
        if (origin.includes('vercel.app') || origin.includes('vercel.com')) {
          return callback(null, true)
        }
      }
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Serve uploaded files
app.use('/uploads', express.static('uploads'))

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/menu', menuRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/reservations', reservationRoutes)
app.use('/api/users', userRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/reviews', reviewRoutes)
app.use('/api/loyalty', loyaltyRoutes)
app.use('/api/giftcards', giftCardRoutes)
app.use('/api/favorites', favoriteRoutes)
app.use('/api/recommendations', recommendationRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Hybah Coffee House API is running' })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500).json({
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

// Database connection and server start
const startServer = async () => {
  try {
    await sequelize.authenticate()
    console.log('Database connection established successfully.')
    
    // Sync database (in development, use migrations in production)
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: false })
      console.log('Database models synchronized.')
    }
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`)
    })
  } catch (error) {
    console.error('Unable to start server:', error)
    process.exit(1)
  }
}

startServer()

export default app

