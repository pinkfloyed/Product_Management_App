// 'use client'

// import { zodResolver } from '@hookform/resolvers/zod'
// import { useRouter } from 'next/navigation'
// import { useForm } from 'react-hook-form'
// import { z } from 'zod'
// import { useGetCategoriesQuery } from '../redux/api/categoriesApi'
// import { useCreateProductMutation, useUpdateProductMutation } from '../redux/api/productsApi'
// import { Product } from '../types'

// // ✅ Define schema
// const ProductSchema = z.object({
//   name: z.string().min(3, 'Name must be at least 3 characters'),
//   description: z.string().min(5, 'Description must be at least 5 characters'),
//   price: z.coerce.number().positive('Price must be positive'), // coerce handles form string → number
//   images: z.string().optional(),
//   categoryId: z.union([z.string(), z.null()]).optional(), // allow null or string
// })

// // ✅ Use `z.infer<typeof ProductSchema>` for the same type as schema
// type FormValues = z.infer<typeof ProductSchema>

// export default function ProductForm({ defaultValues }: { defaultValues?: Product }) {
//   const router = useRouter()
//   const { data: categories } = useGetCategoriesQuery({ offset: 0, limit: 100 })
//   const [createProduct] = useCreateProductMutation()
//   const [updateProduct] = useUpdateProductMutation()

//   // ✅ Normalize default values for RHF
//   const normalizedDefaults: FormValues | undefined = defaultValues
//     ? {
//         name: defaultValues.name,
//         description: defaultValues.description,
//         price: defaultValues.price,
//         images: Array.isArray(defaultValues.images)
//           ? defaultValues.images.join(',')
//           : defaultValues.images ?? '',
//         categoryId: defaultValues.categoryId ?? null,
//       }
//     : undefined

//   // ✅ Explicit generic param for `useForm<FormValues>`
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     watch,
//   } = useForm<FormValues>({
//     resolver: zodResolver(ProductSchema) as any, // 👈 fix TS resolver signature mismatch
//     defaultValues: normalizedDefaults,
//   })

//   const imagesVal = watch('images')
//   const imgPreview = imagesVal?.split(',')[0]?.trim()

//   const onSubmit = async (data: FormValues) => {
//     const body: Partial<Product> = {
//       name: data.name,
//       description: data.description,
//       price: data.price,
//       images: data.images
//         ? data.images.split(',').map((s) => s.trim())
//         : [],
//       categoryId: data.categoryId || null,
//     }

//     try {
//       if (defaultValues?.id) {
//         await updateProduct({ id: defaultValues.id, ...body }).unwrap()
//       } else {
//         await createProduct(body).unwrap()
//       }
//       router.push('/products')
//     } catch (e) {
//       console.error(e)
//       alert('Failed to save product')
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//       <div>
//         <label className="block text-sm">Name</label>
//         <input {...register('name')} className="w-full p-2 border rounded" />
//         {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}
//       </div>

//       <div>
//         <label className="block text-sm">Description</label>
//         <textarea {...register('description')} className="w-full p-2 border rounded" />
//         {errors.description && <p className="text-red-600 text-sm">{errors.description.message}</p>}
//       </div>

//       <div>
//         <label className="block text-sm">Price</label>
//         <input
//           type="number"
//           step="0.01"
//           {...register('price', { valueAsNumber: true })}
//           className="w-full p-2 border rounded"
//         />
//         {errors.price && <p className="text-red-600 text-sm">{errors.price.message}</p>}
//       </div>

//       <div>
//         <label className="block text-sm">Images (comma separated URLs)</label>
//         <input {...register('images')} className="w-full p-2 border rounded" />
//         {imgPreview && (
//           <img
//             src={imgPreview}
//             alt="Preview"
//             className="mt-2 w-48 h-32 object-cover rounded"
//           />
//         )}
//       </div>

//       <div>
//         <label className="block text-sm">Category</label>
//         <select {...register('categoryId')} className="w-full p-2 border rounded">
//           <option value="">Select Category</option>
//           {categories?.map((c: any) => (
//             <option key={c.id} value={c.id}>
//               {c.name}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className="flex gap-2">
//         <button
//           type="submit"
//           className="py-2 px-4 bg-primary text-white rounded hover:bg-primary/90"
//         >
//           Save
//         </button>
//         <button
//           type="button"
//           onClick={() => router.back()}
//           className="py-2 px-4 border rounded"
//         >
//           Cancel
//         </button>
//       </div>
//     </form>
//   )
// }

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
  images: z.array(z.string()).optional(), // images is now an array
  categoryId: z.string().min(1, 'Category is required'),
})

type FormData = z.infer<typeof schema>

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
    const payload = {
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
    } catch (err: any) {
      alert(err?.message || 'Error')
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

