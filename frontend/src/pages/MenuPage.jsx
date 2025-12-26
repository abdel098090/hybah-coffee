import { useState, useEffect } from 'react'
import api from '../services/api'
import { useLanguage } from '../context/LanguageContext'
import MenuItemCard from '../components/MenuItemCard'

const MenuPage = () => {
  const { t, language } = useLanguage()
  const [menuItems, setMenuItems] = useState([])
  const [filteredItems, setFilteredItems] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  const categories = [
    { value: 'all', label: t('allItems') },
    { value: 'chadian_food', label: t('chadianFood') },
    { value: 'traditional_dish', label: t('traditionalDish') },
    { value: 'coffee', label: t('coffee') },
    { value: 'tea', label: t('tea') },
    { value: 'cold_drink', label: t('coldDrink') },
    { value: 'burger', label: t('burger') },
    { value: 'sandwich', label: t('sandwich') },
    { value: 'pastry', label: t('pastry') },
    { value: 'dessert', label: t('dessert') },
    { value: 'side', label: t('side') }
  ]

  useEffect(() => {
    fetchMenuItems()
  }, [])

  useEffect(() => {
    filterItems()
  }, [selectedCategory, searchTerm, menuItems])

  const fetchMenuItems = async () => {
    try {
      setLoading(true)
      const apiUrl = api.defaults?.baseURL || 'http://localhost:5000/api'
      console.log('🔄 Fetching menu items from:', apiUrl + '/menu')
      const response = await api.get('/menu')
      const items = Array.isArray(response.data) ? response.data : []
      console.log('✅ Fetched menu items:', items.length)
      if (items.length > 0) {
        console.log('Categories found:', [...new Set(items.map(i => i.category))])
      } else {
        console.warn('⚠️ Warning: API returned empty array')
      }
      setMenuItems(items)
    } catch (error) {
      console.error('❌ Failed to fetch menu items:', error)
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        url: error.config?.url
      })
      setMenuItems([])
    } finally {
      setLoading(false)
    }
  }

  const filterItems = () => {
    let filtered = [...menuItems] // Create a copy

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory)
    }

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    console.log(`Filtered items: ${filtered.length} (from ${menuItems.length} total)`)
    setFilteredItems(filtered)
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="text-xl mb-4">Loading menu...</div>
          <div className="text-sm text-gray-500">Fetching items from API...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-coffee-brown dark:text-coffee-cream">
        {t('ourMenu')}
      </h1>

      {/* Search and Filter */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder={t('searchMenu')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`px-4 py-2 rounded-lg transition ${
                selectedCategory === category.value
                  ? 'bg-coffee-brown text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Items Grid */}
      {filteredItems.length > 0 ? (
        <>
          <div className="mb-4 text-sm text-gray-700 dark:text-gray-300">
            <strong>Showing {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''}</strong>
            {selectedCategory !== 'all' && ` in ${categories.find(c => c.value === selectedCategory)?.label || selectedCategory}`}
            {menuItems.length > 0 && ` (${menuItems.length} total items available)`}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        </>
      ) : !loading && menuItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400 text-xl mb-4">
            No menu items available.
          </p>
          <p className="text-gray-500 dark:text-gray-500 mb-4">
            Menu items are being loaded. Please check back soon.
          </p>
          <button
            onClick={fetchMenuItems}
            className="px-4 py-2 bg-coffee-brown text-white rounded-lg hover:bg-coffee-dark"
          >
            Retry Loading Menu
          </button>
          <p className="text-xs text-gray-400 mt-4">
            Open browser console (F12) to see error details
          </p>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400 text-xl">
            {t('noItemsFound')}
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all')
              setSearchTerm('')
            }}
            className="mt-4 px-4 py-2 bg-coffee-brown text-white rounded-lg hover:bg-coffee-dark"
          >
            {t('allItems')}
          </button>
        </div>
      )}
    </div>
  )
}

export default MenuPage
