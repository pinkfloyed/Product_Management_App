import { getProductById } from '@/lib/api'
import { notFound } from 'next/navigation'

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id)
  if (!product) return notFound()

  const firstImage = product.images && product.images.length > 0 ? product.images[0] : null

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold mb-2">{product.name}</h1>
      <p className="text-gray-700 mb-4">{product.description}</p>
      <p className="text-lg font-bold mb-2">${product.price}</p>

      {firstImage && (
        <img
          src={firstImage}
          alt={product.name}
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
      )}
    </div>
  )
}

