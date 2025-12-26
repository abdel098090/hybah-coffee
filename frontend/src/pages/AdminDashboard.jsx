import { useState, useEffect } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import api from '../services/api'

const DashboardOverview = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await api.get('/admin/dashboard')
      setStats(response.data)
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="text-center py-12">Loading dashboard...</div>
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-gray-600 dark:text-gray-400 mb-2">Today's Orders</h3>
          <p className="text-3xl font-bold text-coffee-brown">{stats?.todayOrders || 0}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-gray-600 dark:text-gray-400 mb-2">Today's Revenue</h3>
          <p className="text-3xl font-bold text-coffee-brown">
            ${parseFloat(stats?.todayRevenue || 0).toFixed(2)}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-gray-600 dark:text-gray-400 mb-2">Pending Orders</h3>
          <p className="text-3xl font-bold text-yellow-600">{stats?.pendingOrders || 0}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h3 className="text-gray-600 dark:text-gray-400 mb-2">Pending Reservations</h3>
          <p className="text-3xl font-bold text-blue-600">{stats?.pendingReservations || 0}</p>
        </div>
      </div>
    </div>
  )
}

const OrderManagement = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchOrders()
  }, [filter])

  const fetchOrders = async () => {
    try {
      const params = filter !== 'all' ? { status: filter } : {}
      const response = await api.get('/admin/orders', { params })
      setOrders(response.data)
    } catch (error) {
      console.error('Failed to fetch orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateOrderStatus = async (orderId, status) => {
    try {
      await api.put(`/admin/orders/${orderId}/status`, { status })
      fetchOrders()
    } catch (error) {
      console.error('Failed to update order status:', error)
    }
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Order Management</h2>
      
      <div className="mb-4 flex gap-2">
        {['all', 'pending', 'preparing', 'ready', 'completed'].map(status => (
          <button
            key={status}
            onClick={() => {
              setFilter(status)
              setLoading(true)
            }}
            className={`px-4 py-2 rounded ${
              filter === status
                ? 'bg-coffee-brown text-white'
                : 'bg-gray-200 dark:bg-gray-700'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-12">Loading orders...</div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold">Order #{order.id}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(order.created_at).toLocaleString()}
                  </p>
                </div>
                <select
                  value={order.status}
                  onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                  className="px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
                >
                  <option value="pending">Pending</option>
                  <option value="preparing">Preparing</option>
                  <option value="ready">Ready</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <p className="text-lg font-semibold">Total: ${parseFloat(order.total).toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMenuItems()
  }, [])

  const fetchMenuItems = async () => {
    try {
      const response = await api.get('/menu')
      setMenuItems(response.data)
    } catch (error) {
      console.error('Failed to fetch menu items:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Menu Management</h2>
        <button className="px-4 py-2 bg-coffee-brown text-white rounded-lg hover:bg-coffee-dark">
          Add Menu Item
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12">Loading menu...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map(item => (
            <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2">{item.category}</p>
              <p className="text-2xl font-bold text-coffee-brown">${parseFloat(item.price).toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const AdminDashboard = () => {
  const location = useLocation()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-coffee-brown dark:text-coffee-cream">
        Admin Dashboard
      </h1>

      <div className="flex gap-4 mb-6 border-b">
        <Link
          to="/admin"
          className={`pb-2 px-4 font-semibold ${
            location.pathname === '/admin'
              ? 'border-b-2 border-coffee-brown text-coffee-brown'
              : 'text-gray-600 dark:text-gray-400'
          }`}
        >
          Overview
        </Link>
        <Link
          to="/admin/orders"
          className={`pb-2 px-4 font-semibold ${
            location.pathname === '/admin/orders'
              ? 'border-b-2 border-coffee-brown text-coffee-brown'
              : 'text-gray-600 dark:text-gray-400'
          }`}
        >
          Orders
        </Link>
        <Link
          to="/admin/menu"
          className={`pb-2 px-4 font-semibold ${
            location.pathname === '/admin/menu'
              ? 'border-b-2 border-coffee-brown text-coffee-brown'
              : 'text-gray-600 dark:text-gray-400'
          }`}
        >
          Menu
        </Link>
      </div>

      <Routes>
        <Route path="/" element={<DashboardOverview />} />
        <Route path="/orders" element={<OrderManagement />} />
        <Route path="/menu" element={<MenuManagement />} />
      </Routes>
    </div>
  )
}

export default AdminDashboard
