import { useCart } from '../context/CartContext'
import { useLanguage } from '../context/LanguageContext'
import { Link } from 'react-router-dom'

const Cart = ({ isOpen, onClose }) => {
  const { t } = useLanguage()
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-800 shadow-xl overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">{t('cart')}</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              ✕
            </button>
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">{t('emptyCart')}</p>
              <Link
                to="/menu"
                onClick={onClose}
                className="mt-4 inline-block px-6 py-2 bg-coffee-brown text-white rounded hover:bg-coffee-dark transition"
              >
                {t('browseMenu')}
              </Link>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 border rounded">
                    <img
                      src={item.image || '/placeholder-coffee.jpg'}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                      {item.customizations && Object.keys(item.customizations).length > 0 && (
                        <div className="text-xs text-gray-400 mt-1 space-y-1">
                          {item.customizations.size && (
                            <p>Size: {item.customizations.size}</p>
                          )}
                          {item.customizations.milk_type && (
                            <p>Milk: {item.customizations.milk_type}</p>
                          )}
                          {item.customizations.sugar_level && (
                            <p>Sugar: {item.customizations.sugar_level}</p>
                          )}
                          {item.customizations.allergies && item.customizations.allergies.length > 0 && (
                            <p className="text-orange-500">⚠️ Allergies: {item.customizations.allergies.join(', ')}</p>
                          )}
                          {item.customizations.salt_reduction && (
                            <p className="text-blue-500">🔵 Low Salt</p>
                          )}
                          {item.customizations.special_instructions && (
                            <p className="italic">Note: {item.customizations.special_instructions}</p>
                          )}
                          {item.customizations.extras && item.customizations.extras.length > 0 && (
                            <p>Extras: {item.customizations.extras.join(', ')}</p>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-2 py-1 bg-gray-200 rounded"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-2 py-1 bg-gray-200 rounded"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 mb-4">
                <div className="flex justify-between text-xl font-bold mb-4">
                  <span>{t('total')}:</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
                <Link
                  to="/checkout"
                  onClick={onClose}
                  className="block w-full text-center px-6 py-3 bg-coffee-brown text-white rounded hover:bg-coffee-dark transition"
                >
                  {t('checkout')}
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Cart

