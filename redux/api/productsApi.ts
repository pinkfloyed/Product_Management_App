// // redux/api/productsApi.tsx

// import { Product } from '../../types';
// import { apiSlice } from './apiSlice';

// export const productsApi = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     getProducts: builder.query<Product[], { offset: number; limit: number; categoryId?: string } | void>({
//       query: (params) => {
//         if (!params) return '/products'
//         const { offset, limit, categoryId } = params
//         const qs = new URLSearchParams()
//         qs.set('offset', String(offset))
//         qs.set('limit', String(limit))
//         if (categoryId) qs.set('categoryId', categoryId)
//         return `/products?${qs.toString()}`
//       },
//     }),
//     getProductById: builder.query<Product, string>({
//       query: (id) => `/products/${id}`, // ✅ add this
//     }),
//     searchProducts: builder.query<Product[], string>({
//       query: (q) => `/products/search?q=${q}`,
//     }),
//     createProduct: builder.mutation<Product, Partial<Product>>({
//       query: (body) => ({
//         url: '/products',
//         method: 'POST',
//         body,
//       }),
//     }),
//     updateProduct: builder.mutation<Product, Partial<Product> & { id: string }>({
//       query: ({ id, ...body }) => ({
//         url: `/products/${id}`,
//         method: 'PUT',
//         body,
//       }),
//     }),
//     deleteProduct: builder.mutation<{ success: boolean }, string>({
//       query: (id) => ({
//         url: `/products/${id}`,
//         method: 'DELETE',
//       }),
//     }),
//   }),
// })

// export const {
//   useGetProductsQuery,
//   useGetProductByIdQuery, // ✅ export this
//   useSearchProductsQuery,
//   useCreateProductMutation,
//   useUpdateProductMutation,
//   useDeleteProductMutation,
// } = productsApi


import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Product } from '../../types'
import type { RootState } from '../store'

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.bitechx.com/products',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token
      if (token) headers.set('Authorization', `Bearer ${token}`)
      headers.set('Content-Type', 'application/json')
      return headers
    },
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], { offset: number; limit: number; categoryId?: string }>({
      query: ({ offset, limit, categoryId }) => {
        let url = `?offset=${offset}&limit=${limit}`
        if (categoryId) url += `&categoryId=${categoryId}`
        return url
      },
    }),
    searchProducts: builder.query<Product[], string>({
      query: (searchedText) => `search?searchedText=${encodeURIComponent(searchedText)}`,
    }),
    getProductById: builder.query<Product, string>({
      query: (id) => `${id}`,
    }),
    createProduct: builder.mutation<Product, Partial<Product>>({
      query: (body) => ({
        url: '',
        method: 'POST',
        body,
      }),
    }),
    updateProduct: builder.mutation<Product, { id: string; data: Partial<Product> }>({
      query: ({ id, data }) => ({
        url: `${id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteProduct: builder.mutation<{ id: string }, string>({
      query: (id) => ({
        url: `${id}`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const {
  useGetProductsQuery,
  useSearchProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi
