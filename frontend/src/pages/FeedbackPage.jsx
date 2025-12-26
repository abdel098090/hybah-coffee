import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'
import api from '../services/api'

const FeedbackPage = () => {
  const { user, isAuthenticated } = useAuth()
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    rating: 5,
    comment: '',
    customer_name: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleRatingClick = (rating) => {
    setFormData({
      ...formData,
      rating
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const reviewData = {
        rating: formData.rating,
        comment: formData.comment,
        customer_name: formData.customer_name || (user ? user.name : 'Anonymous')
      }

      await api.post('/reviews', reviewData)
      setSubmitted(true)
      setFormData({
        rating: 5,
        comment: '',
        customer_name: ''
      })
      setTimeout(() => setSubmitted(false), 5000)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit feedback. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 max-w-2xl">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-8 text-coffee-brown dark:text-coffee-cream">
        {t('feedbackTitle')}
      </h1>
      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 sm:mb-8">
        {t('feedbackDescription')}
      </p>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        {submitted && (
          <div className="mb-6 p-4 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 rounded-lg">
            <p className="font-semibold">{t('thankYouFeedback')}</p>
            <p className="text-sm mt-1">
              {t('feedbackSubmitted')}
            </p>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name (optional if logged in) */}
          {!isAuthenticated && (
            <div>
              <label className="block mb-2 font-semibold">
                {t('yourName')} <span className="text-gray-500 text-sm">{t('optional')}</span>
              </label>
              <input
                type="text"
                name="customer_name"
                value={formData.customer_name}
                onChange={handleChange}
                placeholder={t('enterYourName')}
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
              />
            </div>
          )}

          {/* Rating */}
          <div>
            <label className="block mb-3 font-semibold">{t('rating')}</label>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => handleRatingClick(rating)}
                  className={`text-4xl transition-transform hover:scale-110 ${
                    rating <= formData.rating
                      ? 'text-yellow-400'
                      : 'text-gray-300 dark:text-gray-600'
                  }`}
                  aria-label={`${t('rating')} ${rating}`}
                >
                  ★
                </button>
              ))}
              <span className="ml-4 text-lg font-semibold text-coffee-brown dark:text-coffee-cream">
                {formData.rating} / 5
              </span>
            </div>
          </div>

          {/* Comment */}
          <div>
            <label className="block mb-2 font-semibold">
              {t('yourFeedback')} <span className="text-red-500">*</span>
            </label>
            <textarea
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              required
              rows="6"
              placeholder={t('feedbackPlaceholder')}
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {t('minimumChars')}
            </p>
          </div>

          <button
            type="submit"
            disabled={loading || formData.comment.length < 10}
            className="w-full px-6 py-3 bg-coffee-brown text-white rounded-lg hover:bg-coffee-dark transition disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
          >
            {loading ? t('submitting') : t('submitFeedback')}
          </button>
        </form>
      </div>

      {/* Info Box */}
      <div className="mt-8 bg-coffee-cream dark:bg-gray-800 rounded-lg p-6">
        <h3 className="font-semibold mb-2 text-coffee-brown dark:text-coffee-cream">
          {t('whyFeedbackMatters')}
        </h3>
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li>• {t('feedbackReason1')}</li>
          <li>• {t('feedbackReason2')}</li>
          <li>• {t('feedbackReason3')}</li>
          <li>• {t('feedbackReason4')}</li>
        </ul>
      </div>
    </div>
  )
}

export default FeedbackPage

