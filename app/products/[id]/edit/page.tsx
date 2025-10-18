'use client'

import { getProductById } from '@/lib/api'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import ProductForm from '../../../../components/ProductForm'

export default function EditProductPage() {
  const params = useParams()
  const [productData, setProductData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProduct() {
      const id = Array.isArray(params.id) ? params.id[0] : params.id
      if (!id) return
      const data = await getProductById(id)
      setProductData(data)
      setLoading(false)
    }
    fetchProduct()
  }, [params.id])

  if (loading) return <p>Loading...</p>

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
      <ProductForm initialData={productData} productId={Array.isArray(params.id) ? params.id[0] : params.id} />
    </div>
  )
}

