import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'

const FeedbackPage = () => {
  const { user, isAuthenticated } = useAuth()
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
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-4xl font-bold mb-8 text-coffee-brown dark:text-coffee-cream">
        Share Your Feedback
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        We value your opinion! Your feedback helps us improve our service and menu. 
        Please note that reviews are subject to approval before being displayed.
      </p>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        {submitted && (
          <div className="mb-6 p-4 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 rounded-lg">
            <p className="font-semibold">Thank you for your feedback!</p>
            <p className="text-sm mt-1">
              Your review has been submitted and will be reviewed before being published.
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
                Your Name <span className="text-gray-500 text-sm">(optional)</span>
              </label>
              <input
                type="text"
                name="customer_name"
                value={formData.customer_name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
              />
            </div>
          )}

          {/* Rating */}
          <div>
            <label className="block mb-3 font-semibold">Rating</label>
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
                  aria-label={`Rate ${rating} stars`}
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
              Your Feedback <span className="text-red-500">*</span>
            </label>
            <textarea
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              required
              rows="6"
              placeholder="Tell us about your experience at Hybah Coffee House..."
              className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Minimum 10 characters
            </p>
          </div>

          <button
            type="submit"
            disabled={loading || formData.comment.length < 10}
            className="w-full px-6 py-3 bg-coffee-brown text-white rounded-lg hover:bg-coffee-dark transition disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
          >
            {loading ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </form>
      </div>

      {/* Info Box */}
      <div className="mt-8 bg-coffee-cream dark:bg-gray-800 rounded-lg p-6">
        <h3 className="font-semibold mb-2 text-coffee-brown dark:text-coffee-cream">
          Why Your Feedback Matters
        </h3>
        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <li>• Helps us improve our menu and service quality</li>
          <li>• Allows us to address any concerns you may have</li>
          <li>• Helps other customers make informed decisions</li>
          <li>• Your feedback is reviewed before being published</li>
        </ul>
      </div>
    </div>
  )
}

export default FeedbackPage

