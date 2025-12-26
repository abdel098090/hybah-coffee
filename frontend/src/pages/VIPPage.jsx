import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import MenuItemCard from '../components/MenuItemCard'

const VIPPage = () => {
  const { isVIP, user } = useAuth()
  const navigate = useNavigate()
  const [vipItems, setVipItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isVIP) {
      navigate('/')
      return
    }
    fetchVIPItems()
  }, [isVIP, navigate])

  const fetchVIPItems = async () => {
    try {
      const response = await api.get('/menu?vip_only=true')
      setVipItems(response.data)
    } catch (error) {
      console.error('Failed to fetch VIP items:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!isVIP) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 dark:from-yellow-600 dark:to-yellow-800 rounded-lg p-8 mb-8 text-white">
        <h1 className="text-4xl font-bold mb-4">👑 VIP Membership</h1>
        <p className="text-xl">
          Welcome, {user?.first_name}! Enjoy exclusive benefits and priority service.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-2">Priority Seating</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Get priority access to reservations
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-2">Exclusive Menu</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Access to VIP-only drinks and food
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-2">Special Discounts</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Enjoy member-only discounts and offers
          </p>
        </div>
      </div>

      <h2 className="text-3xl font-bold mb-6 text-coffee-brown dark:text-coffee-cream">
        Exclusive VIP Menu
      </h2>

      {loading ? (
        <div className="text-center py-12">
          <div className="text-xl">Loading VIP menu...</div>
        </div>
      ) : vipItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vipItems.map(item => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400 text-xl">
            No VIP items available at the moment
          </p>
        </div>
      )}
    </div>
  )
}

export default VIPPage
