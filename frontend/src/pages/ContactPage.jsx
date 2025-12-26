import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'

const ContactPage = () => {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Contact form submission logic would go here
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-coffee-brown dark:text-coffee-cream">
        {t('contactTitle')}
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">{t('sendMessage')}</h2>
          
          {submitted && (
            <div className="mb-4 p-3 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 rounded">
              {t('thankYouMessage')}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-2 font-semibold">{t('nameLabel')}</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">{t('emailLabel')}</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">{t('phoneLabel')}</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">{t('messageLabel')}</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                required
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full px-4 py-2 bg-coffee-brown text-white rounded-lg hover:bg-coffee-dark transition"
            >
              {t('sendMessageButton')}
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">{t('getInTouch')}</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">{t('addressLabel')}</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  123 Coffee Street<br />
                  City, State 12345<br />
                  United States
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">{t('phoneLabelContact')}</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  (555) 123-4567
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">{t('emailLabelContact')}</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  info@hybahcoffee.com
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">{t('businessHours')}</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {t('mondaySunday')}<br />
                  {t('hours')}
                </p>
              </div>
            </div>
          </div>

          {/* Google Maps placeholder */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">{t('findUs')}</h2>
            <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <p className="text-gray-600 dark:text-gray-400">
                {t('mapsPlaceholder')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
