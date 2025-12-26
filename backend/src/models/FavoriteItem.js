import { DataTypes } from 'sequelize'
import { sequelize } from '../config/database.js'

const FavoriteItem = sequelize.define('FavoriteItem', {
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
  menu_item_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'menu_items',
      key: 'id'
    }
  }
}, {
  tableName: 'favorite_items',
  timestamps: true,
  underscored: true,
  indexes: [
    {
      unique: true,
      fields: ['user_id', 'menu_item_id']
    }
  ]
})

export default FavoriteItem



