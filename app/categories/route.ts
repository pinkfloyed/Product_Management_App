import { verifyToken } from '@/lib/jwtHelpers'
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const token = req.headers.get('authorization')?.split(' ')[1]
  if (!verifyToken(token)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const url = new URL(req.url)
  const offset = Number(url.searchParams.get('offset') || 0)
  const limit = Number(url.searchParams.get('limit') || 10)

  const categories = await prisma.category.findMany({
    skip: offset,
    take: limit,
  })
  return NextResponse.json(categories)
}
