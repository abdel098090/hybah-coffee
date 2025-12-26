import { DataTypes } from 'sequelize'
import { sequelize } from '../config/database.js'

const LoyaltyPoints = sequelize.define('LoyaltyPoints', {
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
    defaultValue: 0
  },
  total_earned: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    comment: 'Total points earned lifetime'
  },
  total_redeemed: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    comment: 'Total points redeemed lifetime'
  }
}, {
  tableName: 'loyalty_points',
  timestamps: true,
  underscored: true
})

export default LoyaltyPoints



