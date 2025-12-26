import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_placeholder')

const CheckoutForm = ({ total, onPaymentSuccess }) => {
  const stripe = useStripe()
  const elements = useElements()
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!stripe || !elements) {
      return
    }

    setProcessing(true)
    setError('')

    try {
      // Create payment intent on backend
      const { data } = await api.post('/orders/create-payment-intent', {
        amount: total
      })

      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
        data.clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement)
          }
        }
      )

      if (stripeError) {
        setError(stripeError.message)
        setProcessing(false)
      } else if (paymentIntent.status === 'succeeded') {
        onPaymentSuccess(paymentIntent.id)
      }
    } catch (err) {
      setError('Payment failed. Please try again.')
      setProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-4 border rounded-lg">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
            },
          }}
        />
      </div>
      {error && (
        <div className="text-red-600 dark:text-red-400">{error}</div>
      )}
      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full px-4 py-2 bg-coffee-brown text-white rounded-lg hover:bg-coffee-dark transition disabled:opacity-50"
      >
        {processing ? 'Processing...' : `Pay $${total.toFixed(2)}`}
      </button>
    </form>
  )
}

const CheckoutPage = () => {
  const { cart, getCartTotal, clearCart } = useCart()
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [deliveryType, setDeliveryType] = useState('pickup')
  const [deliveryAddress, setDeliveryAddress] = useState('')
  const [deliveryFee, setDeliveryFee] = useState(0)

  if (!isAuthenticated) {
    navigate('/login')
    return null
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <button
            onClick={() => navigate('/menu')}
            className="px-6 py-2 bg-coffee-brown text-white rounded-lg hover:bg-coffee-dark"
          >
            Browse Menu
          </button>
        </div>
      </div>
    )
  }

  const handlePaymentSuccess = async (paymentIntentId) => {
    try {
      const orderData = {
        items: cart.map(item => ({
          menu_item_id: item.menuItemId,
          quantity: item.quantity,
          customizations: item.customizations
        })),
        delivery_type: deliveryType,
        delivery_address: deliveryType === 'delivery' ? deliveryAddress : null,
        delivery_fee: deliveryFee,
        stripe_payment_intent_id: paymentIntentId
      }

      await api.post('/orders', orderData)
      clearCart()
      navigate('/orders', { state: { orderSuccess: true } })
    } catch (error) {
      console.error('Order creation failed:', error)
      alert('Order creation failed. Please contact support.')
    }
  }

  const subtotal = getCartTotal()
  const total = subtotal + deliveryFee

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-coffee-brown dark:text-coffee-cream">
        Checkout
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
          
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Delivery Type</label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="pickup"
                  checked={deliveryType === 'pickup'}
                  onChange={(e) => {
                    setDeliveryType(e.target.value)
                    setDeliveryFee(0)
                  }}
                  className="mr-2"
                />
                Pickup
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="delivery"
                  checked={deliveryType === 'delivery'}
                  onChange={(e) => {
                    setDeliveryType(e.target.value)
                    setDeliveryFee(5.99)
                  }}
                  className="mr-2"
                />
                Delivery (+$5.99)
              </label>
            </div>
          </div>

          {deliveryType === 'delivery' && (
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Delivery Address</label>
              <textarea
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                rows="3"
                required={deliveryType === 'delivery'}
              />
            </div>
          )}

          <div className="space-y-2 mb-4">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between">
                <span>{item.name} x {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            {deliveryFee > 0 && (
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Payment */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Payment</h2>
          <Elements stripe={stripePromise}>
            <CheckoutForm total={total} onPaymentSuccess={handlePaymentSuccess} />
          </Elements>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
