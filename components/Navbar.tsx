'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { clearAuth } from '../redux/slices/authSlice'
import { RootState } from '../redux/store'

export default function Navbar() {
  const auth = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()
  const router = useRouter()

  const handleLogout = () => {
    dispatch(clearAuth())
    router.push('/auth')
  }

  return (
    <nav className="flex justify-between items-center p-4 bg-blue-600 text-white">
      <Link href="/" className="font-bold text-lg">Product Manager</Link>
      {auth.token ? (
        <div className="flex items-center gap-4">
          <span>{auth.email}</span>
          <button onClick={handleLogout} className="bg-white text-blue-600 px-2 py-1 rounded">Logout</button>
        </div>
      ) : (
        <Link href="/auth" className="bg-white text-blue-600 px-2 py-1 rounded">Login</Link>
      )}
    </nav>
  )
}
