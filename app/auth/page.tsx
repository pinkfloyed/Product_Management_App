'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setToken } from '../../redux/slices/authSlice'
import { RootState } from '../../redux/store'

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const auth = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()
  const router = useRouter()

  
  useEffect(() => {
    if (auth.token) router.push('/products')
  }, [auth.token, router])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return setError('Email is required')
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('https://api.bitechx.com/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) throw new Error('Auth failed')
      const data = await res.json()
      dispatch(setToken({ token: data.token, email }))
      router.push('/products')
    } catch (err: any) {
      setError(err.message || 'Failed to login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={onSubmit} className="w-full max-w-md p-6 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Sign In</h1>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="w-full p-2 mb-3 border rounded"
        />
        {error && <p className="text-red-600 mb-2">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  )
}
