import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'
import { useLanguage } from '../context/LanguageContext'
import Recommendations from '../components/Recommendations'
import Gallery from '../components/Gallery'

const HomePage = () => {
  const { t } = useLanguage()
  const [reviews, setReviews] = useState([])
  const [newsletterEmail, setNewsletterEmail] = useState('')

  useEffect(() => {
    // Fetch approved reviews
    api.get('/reviews?approved=true&limit=3')
      .then(res => setReviews(res.data))
      .catch(err => console.error('Failed to fetch reviews:', err))
  }, [])

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    // Newsletter subscription logic would go here
    alert('Thank you for subscribing!')
    setNewsletterEmail('')
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-coffee-brown via-coffee-dark to-coffee-brown text-white overflow-hidden">
        {/* Background Image Overlay */}
        {/* Alternative image options:
            Coffee Machine: 'url(https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=1920&q=80)'
            Espresso: 'url(https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=1920&q=80)' (current)
            Burger: 'url(https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1920&q=80)'
            Coffee Beans: 'url(https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=1920&q=80)'
        */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=1920&q=80)',
            backgroundBlendMode: 'multiply'
          }}
        >
          {/* Overlay color options:
              Warm Amber: 'from-slate-900/75 via-amber-950/70 to-slate-900/75' (current)
              Rich Brown: 'from-amber-900/80 via-amber-800/75 to-amber-900/80'
              Dark Coffee: 'from-stone-900/80 via-stone-800/75 to-stone-900/80'
              Chocolate: 'from-amber-950/85 via-amber-900/80 to-amber-950/85'
          */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/75 via-amber-950/70 to-slate-900/75"></div>
        </div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-coffee-cream/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-coffee-cream/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="text-center z-10 px-4 max-w-4xl mx-auto">
          <div className="mb-6 animate-fade-in">
            <span className="inline-block px-4 py-2 bg-coffee-cream/20 backdrop-blur-sm rounded-full text-coffee-cream text-sm font-semibold mb-4 border border-coffee-cream/30">
              🇹🇩 Authentic Chadian Cuisine in Chad
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-fade-in delay-200">
            {t('welcome')}
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl mb-4 text-coffee-cream font-light animate-fade-in delay-300">
            {t('premiumCoffee')}
          </p>
          <p className="text-lg md:text-xl mb-10 text-coffee-cream/90 max-w-2xl mx-auto animate-fade-in delay-400">
            {t('experience')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in delay-500">
            <Link
              to="/menu"
              className="px-8 py-4 bg-white text-coffee-brown rounded-lg font-semibold hover:bg-coffee-cream transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {t('orderOnline')}
            </Link>
            <Link
              to="/reservations"
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-coffee-brown transition-all transform hover:scale-105 backdrop-blur-sm"
            >
              {t('reserveSeat')}
            </Link>
            <Link
              to="/vip"
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-coffee-brown transition-all transform hover:scale-105 backdrop-blur-sm"
            >
              {t('joinVIP')}
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
        </div>
      </section>

      {/* Signature Offerings */}
      <section className="py-20 container mx-auto px-4 bg-gray-50 dark:bg-gray-900">
        <h2 className="text-4xl font-bold text-center mb-4 text-coffee-brown dark:text-coffee-cream">
          {t('signatureOfferings')}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition transform hover:scale-105">
            <div className="text-6xl mb-4">☕</div>
            <h3 className="text-2xl font-semibold mb-2 text-coffee-brown dark:text-coffee-cream">Premium Coffee</h3>
            <p className="text-gray-700 dark:text-gray-300">
              {t('premiumCoffeeDesc')}
            </p>
          </div>
          <div className="text-center p-6 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition transform hover:scale-105">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-2xl font-semibold mb-2 text-coffee-brown dark:text-coffee-cream">{t('chadianCuisine')}</h3>
            <p className="text-gray-700 dark:text-gray-300">
              {t('chadianCuisineDesc')}
            </p>
          </div>
          <div className="text-center p-6 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition transform hover:scale-105">
            <div className="text-6xl mb-4">👑</div>
            <h3 className="text-2xl font-semibold mb-2 text-coffee-brown dark:text-coffee-cream">{t('vipExperience')}</h3>
            <p className="text-gray-700 dark:text-gray-300">
              {t('vipExperienceDesc')}
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <Gallery />

      {/* Customer Reviews */}
      {reviews.length > 0 && (
        <section className="py-20 bg-gray-100 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12 text-coffee-brown dark:text-coffee-cream">
              {t('customerReviews')}
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md"
                >
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    "{review.comment}"
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    - {review.customer_name || 'Anonymous'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recommendations */}
      <Recommendations />

      {/* Newsletter */}
      <section className="py-20 container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center bg-coffee-cream dark:bg-gray-800 p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-4 text-coffee-brown dark:text-white">
            {t('stayConnected')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {t('newsletter')}
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex gap-4">
            <input
              type="email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder={t('enterEmail')}
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              required
            />
            <button
              type="submit"
              className="px-6 py-2 bg-coffee-brown text-white rounded-lg hover:bg-coffee-dark transition"
            >
              {t('subscribe')}
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default HomePage

