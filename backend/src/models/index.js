import User from './User.js'
import MenuItem from './MenuItem.js'
import Order from './Order.js'
import OrderItem from './OrderItem.js'
import Reservation from './Reservation.js'
import Address from './Address.js'
import Review from './Review.js'
import LoyaltyPoints from './LoyaltyPoints.js'
import LoyaltyTransaction from './LoyaltyTransaction.js'
import GiftCard from './GiftCard.js'
import FavoriteItem from './FavoriteItem.js'

// Define associations
User.hasMany(Order, { foreignKey: 'user_id', as: 'orders' })
Order.belongsTo(User, { foreignKey: 'user_id', as: 'user' })

User.hasMany(Reservation, { foreignKey: 'user_id', as: 'reservations' })
Reservation.belongsTo(User, { foreignKey: 'user_id', as: 'user' })

User.hasMany(Address, { foreignKey: 'user_id', as: 'addresses' })
Address.belongsTo(User, { foreignKey: 'user_id', as: 'user' })

User.hasMany(Review, { foreignKey: 'user_id', as: 'reviews' })
Review.belongsTo(User, { foreignKey: 'user_id', as: 'user' })

User.hasOne(LoyaltyPoints, { foreignKey: 'user_id', as: 'loyaltyPoints' })
LoyaltyPoints.belongsTo(User, { foreignKey: 'user_id', as: 'user' })

User.hasMany(LoyaltyTransaction, { foreignKey: 'user_id', as: 'loyaltyTransactions' })
LoyaltyTransaction.belongsTo(User, { foreignKey: 'user_id', as: 'user' })

User.hasMany(GiftCard, { foreignKey: 'purchased_by', as: 'purchasedGiftCards' })
User.hasMany(GiftCard, { foreignKey: 'redeemed_by', as: 'redeemedGiftCards' })
GiftCard.belongsTo(User, { foreignKey: 'purchased_by', as: 'purchaser' })
GiftCard.belongsTo(User, { foreignKey: 'redeemed_by', as: 'redeemer' })

User.hasMany(FavoriteItem, { foreignKey: 'user_id', as: 'favorites' })
FavoriteItem.belongsTo(User, { foreignKey: 'user_id', as: 'user' })
FavoriteItem.belongsTo(MenuItem, { foreignKey: 'menu_item_id', as: 'menuItem' })
MenuItem.hasMany(FavoriteItem, { foreignKey: 'menu_item_id', as: 'favoritedBy' })

Order.hasMany(OrderItem, { foreignKey: 'order_id', as: 'items' })
OrderItem.belongsTo(Order, { foreignKey: 'order_id', as: 'order' })

OrderItem.belongsTo(MenuItem, { foreignKey: 'menu_item_id', as: 'menuItem' })
MenuItem.hasMany(OrderItem, { foreignKey: 'menu_item_id', as: 'orderItems' })

Order.hasMany(LoyaltyTransaction, { foreignKey: 'order_id', as: 'loyaltyTransactions' })
LoyaltyTransaction.belongsTo(Order, { foreignKey: 'order_id', as: 'order' })

export {
  User,
  MenuItem,
  Order,
  OrderItem,
  Reservation,
  Address,
  Review,
  LoyaltyPoints,
  LoyaltyTransaction,
  GiftCard,
  FavoriteItem
}

