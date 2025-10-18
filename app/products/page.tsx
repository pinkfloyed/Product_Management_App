'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

export default function ProductsPage() {
  const auth = useSelector((state: RootState) => state.auth)
  const router = useRouter()

  useEffect(() => {
    if (!auth.token) router.push('/auth')
  }, [auth.token, router])

  if (!auth.token) return null

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <p>Here will be the list of products...</p>
    </div>
  )
}
