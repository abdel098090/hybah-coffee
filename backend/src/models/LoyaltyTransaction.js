import { DataTypes } from 'sequelize'
import { sequelize } from '../config/database.js'

const LoyaltyTransaction = sequelize.define('LoyaltyTransaction', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  points: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: 'Positive for earned, negative for redeemed'
  },
  transaction_type: {
    type: DataTypes.ENUM('earned', 'redeemed', 'expired', 'bonus'),
    allowNull: false
  },
  order_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'orders',
      key: 'id'
    },
    comment: 'Associated order if points earned from purchase'
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'loyalty_transactions',
  timestamps: true,
  underscored: true
})

export default LoyaltyTransaction



