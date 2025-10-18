import { verifyToken } from '@/lib/jwtHelpers'
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const token = req.headers.get('authorization')?.split(' ')[1]
  if (!verifyToken(token)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const url = new URL(req.url)
  const offset = Number(url.searchParams.get('offset') || 0)
  const limit = Number(url.searchParams.get('limit') || 10)
  const categoryId = url.searchParams.get('categoryId')

  const products = await prisma.product.findMany({
    skip: offset,
    take: limit,
    where: categoryId ? { categoryId } : undefined,
    include: { category: true },
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(products)
}

export async function POST(req: NextRequest) {
  const token = req.headers.get('authorization')?.split(' ')[1]
  if (!verifyToken(token)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const data = await req.json()
  const product = await prisma.product.create({ data })
  return NextResponse.json(product)
}
