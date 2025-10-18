import { Product } from '../types'

export async function getProductById(id: string): Promise<Product | null> {
  const token = localStorage.getItem('token')
  const res = await fetch(`https://api.bitechx.com/products/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
  if (!res.ok) return null
  return res.json()
}

export async function updateProduct(id: string, data: Partial<Product>): Promise<Product> {
  const token = localStorage.getItem('token')
  const res = await fetch(`https://api.bitechx.com/products/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Update failed')
  return res.json()
}
