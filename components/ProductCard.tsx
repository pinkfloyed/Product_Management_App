// 'use client'

// import Link from 'next/link';
// import { Product } from '../types';

// interface Props {
//   product: Product;
//   onDelete: (product: Product) => void;
//   onEdit: (product: Product) => void;
// }

// export default function ProductCard({ product, onDelete, onEdit }: Props) {
//   return (
//     <div className="border rounded p-3 bg-white shadow-sm">
//       <img
//         src={product.images?.[0] || '/favicon.ico'}
//         alt={product.name}
//         className="w-full h-40 object-cover rounded mb-2"
//       />
//       <h3 className="font-semibold">{product.name}</h3>
//       <div className="text-sm text-gray-600">{product.category?.name}</div>
//       <div className="mt-2 flex items-center justify-between">
//         <div className="text-lg font-semibold">৳ {product.price}</div>
//         <div className="flex gap-2">
//           <Link href={`/products/${product.slug}`} className="text-sm py-1 px-2 border rounded">
//             View
//           </Link>
//           <button onClick={() => onEdit(product)} className="text-sm py-1 px-2 border rounded">
//             Edit
//           </button>
//           <button onClick={() => onDelete(product)} className="text-sm py-1 px-2 border rounded text-red-600">
//             Delete
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

import { Product } from '../types'

type Props = {
  product: Product
  onEdit: (product: Product) => void
  onDelete: (product: Product) => void
}

export default function ProductCard({ product, onEdit, onDelete }: Props) {
  return (
    <div className="border rounded p-3 shadow hover:shadow-lg transition relative">
      <img
        src={product.images?.[0]}
        alt={product.name}
        className="w-full h-48 object-cover rounded mb-2"
      />
      <h3 className="font-semibold">{product.name}</h3>
      <p className="text-gray-600 text-sm truncate">{product.description}</p>
      <p className="font-bold mt-1">${product.price}</p>
      <div className="flex justify-end gap-2 mt-2">
        <button
          onClick={() => onEdit(product)}
          className="bg-yellow-400 px-2 py-1 rounded text-white hover:bg-yellow-500"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(product)}
          className="bg-red-500 px-2 py-1 rounded text-white hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  )
}
