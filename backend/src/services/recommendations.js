// Simple recommendation engine based on order history
// In production, this could use machine learning or more sophisticated algorithms

export const getRecommendations = async (userId, orderHistory, allMenuItems) => {
  try {
    // Get user's most ordered items
    const itemFrequency = {}
    
    orderHistory.forEach(order => {
      order.items?.forEach(item => {
        const itemId = item.menu_item_id
        itemFrequency[itemId] = (itemFrequency[itemId] || 0) + item.quantity
      })
    })
    
    // Get top 3 most ordered categories
    const categoryFrequency = {}
    orderHistory.forEach(order => {
      order.items?.forEach(item => {
        if (item.menuItem) {
          const category = item.menuItem.category
          categoryFrequency[category] = (categoryFrequency[category] || 0) + item.quantity
        }
      })
    })
    
    const topCategories = Object.entries(categoryFrequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([category]) => category)
    
    // Recommend items from same categories that user hasn't ordered frequently
    const recommended = allMenuItems
      .filter(item => {
        // Filter out items user has ordered a lot
        const orderCount = itemFrequency[item.id] || 0
        return orderCount < 3 && topCategories.includes(item.category) && item.is_available
      })
      .slice(0, 6) // Return top 6 recommendations
    
    return recommended
  } catch (error) {
    console.error('Get recommendations error:', error)
    return []
  }
}

export default { getRecommendations }



