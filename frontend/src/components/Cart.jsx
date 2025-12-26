import { useCart } from '../context/CartContext'
import { useLanguage } from '../context/LanguageContext'
import { Link } from 'react-router-dom'

const Cart = ({ isOpen, onClose }) => {
  const { t, language } = useLanguage()
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart()

  // Helper function to translate common values
  const translateValue = (value) => {
    if (!value) return value
    const lowerValue = value.toLowerCase()
    const translationMap = {
      'small': t('small'),
      'medium': t('medium'),
      'large': t('large'),
      'extra large': t('extraLarge'),
      'extra-large': t('extraLarge'),
      'whole milk': language === 'ar' ? 'حليب كامل' : language === 'fr' ? 'Lait entier' : 'Whole Milk',
      'skim milk': language === 'ar' ? 'حليب خالي الدسم' : language === 'fr' ? 'Lait écrémé' : 'Skim Milk',
      'almond milk': language === 'ar' ? 'حليب اللوز' : language === 'fr' ? 'Lait d\'amande' : 'Almond Milk',
      'soy milk': language === 'ar' ? 'حليب الصويا' : language === 'fr' ? 'Lait de soja' : 'Soy Milk',
      'oat milk': language === 'ar' ? 'حليب الشوفان' : language === 'fr' ? 'Lait d\'avoine' : 'Oat Milk',
      'no sugar': language === 'ar' ? 'بدون سكر' : language === 'fr' ? 'Sans sucre' : 'No Sugar',
      'low sugar': language === 'ar' ? 'قليل السكر' : language === 'fr' ? 'Peu de sucre' : 'Low Sugar',
      'medium sugar': language === 'ar' ? 'سكر متوسط' : language === 'fr' ? 'Sucre moyen' : 'Medium Sugar',
      'high sugar': language === 'ar' ? 'كثير السكر' : language === 'fr' ? 'Beaucoup de sucre' : 'High Sugar'
    }
    return translationMap[lowerValue] || value
  }

  // Allergen keys for translation
  const allergenKeys = ['peanuts', 'treeNuts', 'dairy', 'eggs', 'gluten', 'soy', 'fish', 'shellfish', 'sesame']

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-800 shadow-xl overflow-y-auto z-50">
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
                            <p>{t('sizeLabel')}: {translateValue(item.customizations.size)}</p>
                          )}
                          {item.customizations.milk_type && (
                            <p>{t('milkLabel')}: {translateValue(item.customizations.milk_type)}</p>
                          )}
                          {item.customizations.sugar_level && (
                            <p>{t('sugarLabel')}: {translateValue(item.customizations.sugar_level)}</p>
                          )}
                          {item.customizations.allergies && item.customizations.allergies.length > 0 && (
                            <p className="text-orange-500">⚠️ {t('allergiesLabel')}: {item.customizations.allergies.map(a => {
                              // Allergies are stored as keys (peanuts, treeNuts, etc.), translate them
                              const allergenKeys = ['peanuts', 'treeNuts', 'dairy', 'eggs', 'gluten', 'soy', 'fish', 'shellfish', 'sesame']
                              if (allergenKeys.includes(a)) {
                                return t(a)
                              }
                              // Fallback: try common variations
                              const allergenKeyMap = {
                                'tree nuts': 'treeNuts',
                                'tree_nuts': 'treeNuts'
                              }
                              const key = allergenKeyMap[a.toLowerCase()]
                              return key ? t(key) : a
                            }).join(', ')}</p>
                          )}
                          {item.customizations.salt_reduction && (
                            <p className="text-blue-500">🔵 {t('lowSalt')}</p>
                          )}
                          {item.customizations.special_instructions && (
                            <p className="italic">{t('noteLabel')}: {item.customizations.special_instructions}</p>
                          )}
                          {item.customizations.extras && item.customizations.extras.length > 0 && (
                            <p>{t('extrasLabel')}: {item.customizations.extras.join(', ')}</p>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 bg-coffee-brown text-white rounded hover:bg-coffee-dark transition font-bold text-lg dark:bg-coffee-brown dark:hover:bg-coffee-dark"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="font-semibold text-gray-700 dark:text-gray-300 min-w-[2rem] text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 bg-coffee-brown text-white rounded hover:bg-coffee-dark transition font-bold text-lg dark:bg-coffee-brown dark:hover:bg-coffee-dark"
                        aria-label="Increase quantity"
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

