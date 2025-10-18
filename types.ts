export type Category = {
  id: string
  name: string
  description?: string | null
  image?: string | null
  createdAt?: string
  updatedAt?: string
}

export type Product = {
  id: string
  name: string
  description: string
  images?: string[]
  price: number
  slug?: string
  category?: Category
  categoryId?: string
  createdAt?: string
  updatedAt?: string
}
