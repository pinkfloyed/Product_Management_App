import jwt from 'jsonwebtoken'
import { getEmailByToken } from './authStore'

const JWT_SECRET = process.env.JWT_SECRET!

export function verifyToken(token?: string) {
  if (!token) return false
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { email: string }
    return !!getEmailByToken(token) && !!decoded.email
  } catch {
    return false
  }
}
