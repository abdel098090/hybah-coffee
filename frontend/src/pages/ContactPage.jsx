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
                  43H7+98R, Boulevard du President N'Garta Tombalbaye<br />
                  4EME RONDISSEMENT<br />
                  N'Djamena, Chad
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">{t('phoneLabelContact')}</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  <a href="tel:+23562003284" className="hover:text-coffee-brown dark:hover:text-coffee-cream transition">
                    +235 62 00 32 84
                  </a>
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">{t('emailLabelContact')}</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  <a href="mailto:info@hybahcoffee.com" className="hover:text-coffee-brown dark:hover:text-coffee-cream transition">
                    info@hybahcoffee.com
                  </a>
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

          {/* Google Maps */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">{t('findUs')}</h2>
            <div className="h-64 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.5!2d15.05!3d12.11!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDA2JzM2LjAiTiAxNcKwMDMnMDAuMCJF!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus&q=Hybah+coffee+house+Boulevard+du+President+N%27Garta+Tombalbaye+N%27Djamena+Chad"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Hybah Coffee House Location"
                className="w-full h-full"
              ></iframe>
            </div>
            <div className="mt-4">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Hybah+coffee+house+N'Djamena+Chad"
                target="_blank"
                rel="noopener noreferrer"
                className="text-coffee-brown dark:text-coffee-cream hover:underline font-semibold inline-flex items-center gap-2"
              >
                {t('viewOnGoogleMaps')} →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
