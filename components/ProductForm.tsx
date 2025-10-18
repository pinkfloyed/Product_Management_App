'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { useGetCategoriesQuery } from '../redux/api/categoriesApi'
import { useCreateProductMutation, useUpdateProductMutation } from '../redux/api/productsApi'

// Zod schema
const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.number().positive('Price must be positive'),
  images: z.array(z.string()).optional(),
  categoryId: z.string().min(1, 'Category is required'),
})

export type FormData = z.infer<typeof schema>

type Props = {
  initialData?: Partial<FormData>
  productId?: string
}

export default function ProductForm({ initialData, productId }: Props) {
  const router = useRouter()
  const { data: categories } = useGetCategoriesQuery({ offset: 0, limit: 100 })
  const [createProduct] = useCreateProductMutation()
  const [updateProduct] = useUpdateProductMutation()

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: initialData || {},
  })

  // Populate form with initial data
  useEffect(() => {
    if (!initialData) return

    setValue('name', initialData.name || '')
    setValue('description', initialData.description || '')
    setValue('price', initialData.price || 0)
    setValue('images', initialData.images || [])
    setValue('categoryId', initialData.categoryId || '')
  }, [initialData, setValue])

  const onSubmit = async (data: FormData) => {
    const payload: FormData = {
      ...data,
      images: Array.isArray(data.images)
        ? data.images.map(img => img.trim()).filter(Boolean)
        : [],
    }

    try {
      if (productId) {
        await updateProduct({ id: productId, data: payload }).unwrap()
        router.push(`/products/${productId}`)
      } else {
        const newProduct = await createProduct(payload).unwrap()
        router.push(`/products/${newProduct.id}`)
      }
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message)
      } else {
        alert('Error occurred')
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <input
        {...register('name')}
        placeholder="Name"
        className="w-full border p-2 rounded"
      />
      {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

      <textarea
        {...register('description')}
        placeholder="Description"
        className="w-full border p-2 rounded"
      />
      {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}

      <input
        type="number"
        {...register('price', { valueAsNumber: true })}
        placeholder="Price"
        className="w-full border p-2 rounded"
      />
      {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}

      {/* Images input as comma-separated string */}
      <input
        {...register('images', {
          setValueAs: val =>
            typeof val === 'string'
              ? val.split(',').map(img => img.trim()).filter(Boolean)
              : [],
        })}
        placeholder="Images (comma separated URLs)"
        className="w-full border p-2 rounded"
        defaultValue={initialData?.images?.join(', ')}
      />

      <select {...register('categoryId')} className="w-full border p-2 rounded">
        <option value="">Select Category</option>
        {categories?.map(c => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>
      {errors.categoryId && <p className="text-red-500 text-sm">{errors.categoryId.message}</p>}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {productId ? 'Update Product' : 'Create Product'}
      </button>
    </form>
  )
}
