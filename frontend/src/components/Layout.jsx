import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { useTheme } from '../context/ThemeContext'
import { useLanguage } from '../context/LanguageContext'
import Cart from './Cart'
import LanguageSelector from './LanguageSelector'

const Layout = ({ children }) => {
  const { user, logout, isAuthenticated } = useAuth()
  const { getCartItemCount } = useCart()
  const { theme, toggleTheme } = useTheme()
  const { t } = useLanguage()
  const navigate = useNavigate()
  const [cartOpen, setCartOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <nav className="bg-coffee-brown dark:bg-gray-800 text-white shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="text-2xl font-bold">
              ☕ Hybah Coffee House
            </Link>
            
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/" className="hover:text-coffee-cream transition">{t('home')}</Link>
              <Link to="/menu" className="hover:text-coffee-cream transition">{t('menu')}</Link>
              <Link to="/about" className="hover:text-coffee-cream transition">{t('about')}</Link>
              <Link to="/contact" className="hover:text-coffee-cream transition">{t('contact')}</Link>
              <Link to="/feedback" className="hover:text-coffee-cream transition">{t('feedback')}</Link>
              
              {isAuthenticated && (
                <>
                  <Link to="/account" className="hover:text-coffee-cream transition">{t('account')}</Link>
                  <Link to="/orders" className="hover:text-coffee-cream transition">{t('orders')}</Link>
                  {user?.vip_status && (
                    <Link to="/vip" className="hover:text-coffee-cream transition">VIP</Link>
                  )}
                  <Link to="/loyalty" className="hover:text-coffee-cream transition">Rewards</Link>
                </>
              )}
              
              {user?.role === 'admin' && (
                <Link to="/admin" className="hover:text-coffee-cream transition">Admin</Link>
              )}
            </div>
            
            <div className="flex items-center space-x-4">
              <LanguageSelector />
              
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2 hover:bg-coffee-dark rounded transition"
              >
                🛒
                {getCartItemCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getCartItemCount()}
                  </span>
                )}
              </button>
              
              <button
                onClick={toggleTheme}
                className="p-2 hover:bg-coffee-dark rounded transition"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>
              
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-coffee-dark hover:bg-gray-700 rounded transition"
                >
                  {t('logout')}
                </button>
              ) : (
                <Link
                  to="/login"
                  className="px-4 py-2 bg-coffee-dark hover:bg-gray-700 rounded transition"
                >
                  {t('login')}
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
      
      <main>{children}</main>
      
      <footer className="bg-gray-800 text-white mt-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Hybah Coffee House</h3>
              <p className="text-gray-400">Premium coffee and dining experience</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('quickLinks')}</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/menu" className="hover:text-white">{t('menu')}</Link></li>
                <li><Link to="/about" className="hover:text-white">{t('about')}</Link></li>
                <li><Link to="/contact" className="hover:text-white">{t('contact')}</Link></li>
                <li><Link to="/feedback" className="hover:text-white">{t('feedback')}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('followUs')}</h4>
              <p className="text-gray-400 mb-4">Connect with us on social media</p>
              <div className="flex space-x-4">
                <a
                  href="https://facebook.com/hybahcoffee"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-3xl hover:text-blue-500 transition transform hover:scale-110"
                  aria-label="Facebook"
                >
                  📘
                </a>
                <a
                  href="https://instagram.com/hybahcoffee"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-3xl hover:text-pink-500 transition transform hover:scale-110"
                  aria-label="Instagram"
                >
                  📷
                </a>
                <a
                  href="https://twitter.com/hybahcoffee"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-3xl hover:text-blue-400 transition transform hover:scale-110"
                  aria-label="Twitter"
                >
                  🐦
                </a>
                <a
                  href="https://whatsapp.com/send?phone=1234567890"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-3xl hover:text-green-500 transition transform hover:scale-110"
                  aria-label="WhatsApp"
                >
                  💬
                </a>
                <a
                  href="https://youtube.com/@hybahcoffee"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-3xl hover:text-red-500 transition transform hover:scale-110"
                  aria-label="YouTube"
                >
                  ▶️
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-400">
            <p>&copy; 2024 Hybah Coffee House. {t('allRightsReserved')}</p>
          </div>
        </div>
      </footer>
      
      <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  )
}

export default Layout

