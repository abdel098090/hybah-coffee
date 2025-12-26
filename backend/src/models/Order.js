import { DataTypes } from 'sequelize'
import { sequelize } from '../config/database.js'

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  status: {
    type: DataTypes.ENUM('pending', 'preparing', 'ready', 'completed', 'cancelled'),
    defaultValue: 'pending'
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  delivery_type: {
    type: DataTypes.ENUM('pickup', 'delivery'),
    allowNull: false
  },
  delivery_address: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  delivery_fee: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },
  estimated_time: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: 'Estimated preparation time in minutes'
  },
  stripe_payment_intent_id: {
    type: DataTypes.STRING,
    allowNull: true
  },
  customer_email: {
    type: DataTypes.STRING,
    allowNull: true
  },
  customer_phone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'orders',
  timestamps: true,
  underscored: true
})

export default Order

