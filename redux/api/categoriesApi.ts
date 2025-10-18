// import { apiSlice } from './apiSlice'

// interface Category {
//   id: number
//   name: string
// }

// interface GetCategoriesArgs {
//   offset?: number
//   limit?: number
// }

// export const categoriesApi = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     getCategories: builder.query<Category[], GetCategoriesArgs>({
//       query: ({ offset = 0, limit = 50 } = {}) =>
//         `/categories?offset=${offset}&limit=${limit}`,
//       providesTags: (result) =>
//         result
//           ? [
//               ...result.map((r) => ({ type: 'Categories' as const, id: r.id })),
//               { type: 'Categories' as const, id: 'LIST' },
//             ]
//           : [{ type: 'Categories' as const, id: 'LIST' }],
//     }),
//   }),
// })

// export const { useGetCategoriesQuery } = categoriesApi


import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Category } from '../../types'
import type { RootState } from '../store'

export const categoriesApi = createApi({
  reducerPath: 'categoriesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.bitechx.com/categories',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token
      if (token) headers.set('Authorization', `Bearer ${token}`)
      headers.set('Content-Type', 'application/json')
      return headers
    },
  }),
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], { offset: number; limit: number }>({
      query: ({ offset, limit }) => `?offset=${offset}&limit=${limit}`,
    }),
    searchCategories: builder.query<Category[], string>({
      query: (searchedText) => `search?searchedText=${encodeURIComponent(searchedText)}`,
    }),
  }),
})

export const { useGetCategoriesQuery, useSearchCategoriesQuery } = categoriesApi
