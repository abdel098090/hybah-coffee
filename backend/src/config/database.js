import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Support PostgreSQL, SQLite fallback, and individual config options
const getDatabaseConfig = () => {
  // Try PostgreSQL first if DATABASE_URL is set and doesn't contain 'sqlite'
  if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('sqlite')) {
    try {
      return {
        url: process.env.DATABASE_URL,
        dialect: 'postgres'
      }
    } catch (error) {
      console.warn('PostgreSQL connection failed, falling back to SQLite:', error.message)
    }
  }
  
  // Fallback to individual PostgreSQL config options
  if (process.env.DB_HOST && process.env.DB_NAME && !process.env.USE_SQLITE) {
    return {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 5432,
      database: process.env.DB_NAME,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || '',
      dialect: 'postgres'
    }
  }
  
  // Use SQLite as fallback for development (no setup required!)
  if (process.env.NODE_ENV === 'development' || process.env.USE_SQLITE === 'true') {
    const dbPath = path.join(__dirname, '../../database.sqlite')
    console.log('📦 Using SQLite database for development:', dbPath)
    console.log('💡 To use PostgreSQL, set DATABASE_URL in .env file')
    return {
      dialect: 'sqlite',
      storage: dbPath,
      logging: false
    }
  }
  
  // Production requires explicit database config
  throw new Error(
    'Database configuration missing!\n' +
    'Please set DATABASE_URL in your .env file.\n' +
    'Example: DATABASE_URL=postgresql://username:password@localhost:5432/hybah_coffee\n' +
    'Or set USE_SQLITE=true for SQLite (development only)'
  )
}

const config = getDatabaseConfig()

// Create Sequelize instance based on database type
let sequelize
if (config.url && config.dialect === 'postgres') {
  // PostgreSQL with connection URL
  sequelize = new Sequelize(config.url, {
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  })
} else if (config.dialect === 'sqlite') {
  // SQLite
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: config.storage,
    logging: process.env.NODE_ENV === 'development' ? console.log : false
  })
} else {
  // PostgreSQL with individual options
  sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    port: config.port,
  dialect: 'postgres',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})
}

export { sequelize }

