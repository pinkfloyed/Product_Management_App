import { addToken } from '@/lib/authStore'
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'

const JWT_SECRET = process.env.JWT_SECRET!

export async function POST(req: NextRequest) {
  const { email } = await req.json()
  if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 })

  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1d' })
  addToken(token, email)

  return NextResponse.json({ token })
}
