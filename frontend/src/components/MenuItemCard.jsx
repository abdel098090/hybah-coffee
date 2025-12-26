import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'
import api from '../services/api'

const MenuItemCard = ({ item }) => {
  const { t, language } = useLanguage()
  const { addToCart } = useCart()
  const { isVIP } = useAuth()
  const [showCustomize, setShowCustomize] = useState(false)
  const [customizations, setCustomizations] = useState({
    size: 'Medium',
    milk_type: '',
    sugar_level: '',
    extras: [],
    allergies: [],
    salt_reduction: false,
    special_instructions: ''
  })

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

  // Don't show VIP-only items to non-VIP users
  if (item.is_vip_only && !isVIP) {
    return null
  }

  const handleAddToCart = () => {
    if (item.customization_options) {
      setShowCustomize(true)
    } else {
      addToCart(item, customizations)
    }
  }

  const handleCustomizeAdd = () => {
    addToCart(item, customizations)
    setShowCustomize(false)
    setCustomizations({
      size: 'Medium',
      milk_type: '',
      sugar_level: '',
      extras: [],
      allergies: [],
      salt_reduction: false,
      special_instructions: ''
    })
  }

  // Reset customizations when language changes
  useEffect(() => {
    if (showCustomize) {
      setCustomizations(prev => ({
        ...prev,
        size: prev.size || 'Medium'
      }))
    }
  }, [language, showCustomize])

  // Allergens with translation keys
  const allergenKeys = ['peanuts', 'treeNuts', 'dairy', 'eggs', 'gluten', 'soy', 'fish', 'shellfish', 'sesame']
  const commonAllergens = allergenKeys.map(key => ({ key, label: t(key) }))
  
  const handleAllergyToggle = (allergen) => {
    setCustomizations(prev => ({
      ...prev,
      allergies: prev.allergies.includes(allergen)
        ? prev.allergies.filter(a => a !== allergen)
        : [...prev.allergies, allergen]
    }))
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
        {item.image_url ? (
          <img
            src={item.image_url}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl">
            {item.category === 'coffee' ? '☕' : item.category === 'burger' ? '🍔' : '🍽️'}
          </div>
        )}
        {item.is_vip_only && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-semibold">
            VIP
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 text-coffee-brown dark:text-white">
          {item.name}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
          {item.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-coffee-dark dark:text-coffee-cream">
            ${parseFloat(item.price).toFixed(2)}
          </span>
          <button
            onClick={handleAddToCart}
            className="px-4 py-2 bg-coffee-brown text-white rounded hover:bg-coffee-dark transition"
          >
            {t('addToCart')}
          </button>
        </div>
      </div>

      {/* Customization Modal */}
      {showCustomize && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold mb-4">{t('customize')} {item.name}</h3>
            
            {item.customization_options?.sizes && (
              <div className="mb-4">
                <label className="block mb-2 font-semibold">{t('size')}</label>
                <select
                  value={customizations.size}
                  onChange={(e) => setCustomizations({ ...customizations, size: e.target.value })}
                  className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
                >
                  {item.customization_options.sizes.map(size => (
                    <option key={size} value={size}>{translateValue(size)}</option>
                  ))}
                </select>
              </div>
            )}

            {item.customization_options?.milk_types && (
              <div className="mb-4">
                <label className="block mb-2 font-semibold">{t('milkType')}</label>
                <select
                  value={customizations.milk_type}
                  onChange={(e) => setCustomizations({ ...customizations, milk_type: e.target.value })}
                  className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
                >
                  <option value="">{t('selectMilkType')}</option>
                  {item.customization_options.milk_types.map(milk => (
                    <option key={milk} value={milk}>{translateValue(milk)}</option>
                  ))}
                </select>
              </div>
            )}

            {item.customization_options?.sugar_levels && (
              <div className="mb-4">
                <label className="block mb-2 font-semibold">{t('sugarLevel')}</label>
                <select
                  value={customizations.sugar_level}
                  onChange={(e) => setCustomizations({ ...customizations, sugar_level: e.target.value })}
                  className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
                >
                  <option value="">{t('selectSugarLevel')}</option>
                  {item.customization_options.sugar_levels.map(level => (
                    <option key={level} value={level}>{translateValue(level)}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Allergy Information */}
            <div className="mb-4">
              <label className="block mb-2 font-semibold">{t('allergiesToAvoid')}</label>
              <div className="grid grid-cols-2 gap-2">
                {commonAllergens.map(allergen => (
                  <label key={allergen.key} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={customizations.allergies.includes(allergen.key)}
                      onChange={() => handleAllergyToggle(allergen.key)}
                      className="rounded"
                    />
                    <span className="text-sm">{allergen.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Salt Reduction */}
            <div className="mb-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={customizations.salt_reduction}
                  onChange={(e) => setCustomizations({ ...customizations, salt_reduction: e.target.checked })}
                  className="rounded"
                />
                <span className="font-semibold">{t('reduceSalt')}</span>
              </label>
            </div>

            {/* Special Instructions */}
            <div className="mb-4">
              <label className="block mb-2 font-semibold">{t('specialInstructions')}</label>
              <textarea
                value={customizations.special_instructions}
                onChange={(e) => setCustomizations({ ...customizations, special_instructions: e.target.value })}
                placeholder={t('specialInstructionsPlaceholder')}
                className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-white"
                rows="3"
              />
            </div>

            {/* Extras (if available) */}
            {item.customization_options?.extras && item.customization_options.extras.length > 0 && (
              <div className="mb-4">
                <label className="block mb-2 font-semibold">{t('addExtras')}</label>
                <div className="space-y-2">
                  {item.customization_options.extras.map(extra => (
                    <label key={extra.name} className="flex items-center justify-between cursor-pointer">
                      <span>{extra.name}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">+${extra.price?.toFixed(2) || '0.00'}</span>
                        <input
                          type="checkbox"
                          checked={customizations.extras.includes(extra.name)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setCustomizations(prev => ({
                                ...prev,
                                extras: [...prev.extras, extra.name]
                              }))
                            } else {
                              setCustomizations(prev => ({
                                ...prev,
                                extras: prev.extras.filter(e => e !== extra.name)
                              }))
                            }
                          }}
                          className="rounded"
                        />
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setShowCustomize(false)}
                className="flex-1 px-4 py-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {t('cancel')}
              </button>
              <button
                onClick={handleCustomizeAdd}
                className="flex-1 px-4 py-2 bg-coffee-brown text-white rounded hover:bg-coffee-dark"
              >
                {t('addToCart')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MenuItemCard

