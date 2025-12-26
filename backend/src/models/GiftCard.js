import { DataTypes } from 'sequelize'
import { sequelize } from '../config/database.js'
import crypto from 'crypto'

const GiftCard = sequelize.define('GiftCard', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      defaultValue: () => crypto.randomBytes(8).toString('hex').toUpperCase()
    },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  balance: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    comment: 'Remaining balance'
  },
  purchased_by: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  purchased_for_email: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'Email of gift card recipient'
  },
  redeemed_by: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  redeemed_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  expires_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('active', 'redeemed', 'expired', 'cancelled'),
    defaultValue: 'active'
  }
}, {
  tableName: 'gift_cards',
  timestamps: true,
  underscored: true
})

export default GiftCard

