import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'

const LoyaltyPage = () => {
  const { user } = useAuth()
  const [points, setPoints] = useState(null)
  const [transactions, setTransactions] = useState([])
  const [redeemPoints, setRedeemPoints] = useState(100)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPoints()
    fetchTransactions()
  }, [])

  const fetchPoints = async () => {
    try {
      const response = await api.get('/loyalty/points')
      setPoints(response.data)
    } catch (error) {
      console.error('Failed to fetch points:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchTransactions = async () => {
    try {
      const response = await api.get('/loyalty/transactions')
      setTransactions(response.data)
    } catch (error) {
      console.error('Failed to fetch transactions:', error)
    }
  }

  const handleRedeem = async () => {
    try {
      const response = await api.post('/loyalty/redeem', { points: redeemPoints })
      alert(`Success! You received $${response.data.discountAmount.toFixed(2)} discount. Remaining points: ${response.data.remainingPoints}`)
      fetchPoints()
      fetchTransactions()
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to redeem points')
    }
  }

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-coffee-brown dark:text-coffee-cream">
        Loyalty Rewards
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Your Points</h2>
          <div className="text-6xl font-bold text-coffee-brown mb-4">
            {points?.points || 0}
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Total Earned: {points?.total_earned || 0} points
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Total Redeemed: {points?.total_redeemed || 0} points
          </p>

          <div className="border-t pt-4">
            <h3 className="font-semibold mb-4">Redeem Points</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              100 points = $1 discount
            </p>
            <div className="flex gap-4">
              <input
                type="number"
                value={redeemPoints}
                onChange={(e) => setRedeemPoints(parseInt(e.target.value) || 100)}
                min="100"
                step="100"
                className="flex-1 px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
              />
              <button
                onClick={handleRedeem}
                className="px-6 py-2 bg-coffee-brown text-white rounded-lg hover:bg-coffee-dark transition"
              >
                Redeem
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              You'll receive: ${(redeemPoints / 100).toFixed(2)} discount
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Transaction History</h2>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {transactions.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-400">No transactions yet</p>
            ) : (
              transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex justify-between items-center p-3 border rounded dark:border-gray-700"
                >
                  <div>
                    <p className="font-semibold">
                      {transaction.points > 0 ? '+' : ''}{transaction.points} points
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {transaction.description || transaction.transaction_type}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(transaction.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded text-sm ${
                      transaction.points > 0
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}
                  >
                    {transaction.transaction_type}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoyaltyPage



