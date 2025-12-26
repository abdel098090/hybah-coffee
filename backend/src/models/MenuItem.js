import { DataTypes } from 'sequelize'
import { sequelize } from '../config/database.js'

const MenuItem = sequelize.define('MenuItem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category: {
    type: DataTypes.ENUM('coffee', 'tea', 'cold_drink', 'burger', 'sandwich', 'pastry', 'dessert', 'side', 'chadian_food', 'traditional_dish'),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: true
  },
  is_vip_only: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  is_available: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  allergens: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  nutrition_info: {
    type: DataTypes.JSONB,
    allowNull: true
  },
  customization_options: {
    type: DataTypes.JSONB,
    allowNull: true,
    defaultValue: {
      sizes: ['Small', 'Medium', 'Large'],
      milk_types: ['Whole', 'Almond', 'Oat', 'Soy'],
      sugar_levels: ['None', 'Low', 'Medium', 'High'],
      extras: []
    }
  }
}, {
  tableName: 'menu_items',
  timestamps: true,
  underscored: true
})

export default MenuItem

