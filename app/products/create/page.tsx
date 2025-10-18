'use client'

import ProductForm from '../../../components/ProductForm'

export default function CreateProductPage() {
  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Create Product</h2>
      <ProductForm />
    </div>
  )
}
