// // components/SkeletonCard.tsx

// 'use client'
// export default function SkeletonCard() {
//   return (
//     <div className="border rounded p-3 animate-pulse bg-white">
//       <div className="bg-gray-200 h-40 w-full rounded mb-2"></div>
//       <div className="h-4 bg-gray-200 w-3/4 rounded mb-2"></div>
//       <div className="h-3 bg-gray-200 w-1/2 rounded"></div>
//     </div>
//   )
// }

export default function SkeletonCard() {
  return (
    <div className="border rounded p-3 shadow animate-pulse">
      <div className="bg-gray-300 w-full h-48 rounded mb-2" />
      <div className="bg-gray-300 w-3/4 h-5 rounded mb-1" />
      <div className="bg-gray-300 w-full h-4 rounded mb-1" />
      <div className="bg-gray-300 w-1/2 h-5 rounded mt-2" />
      <div className="flex gap-2 mt-2">
        <div className="bg-gray-300 w-12 h-6 rounded" />
        <div className="bg-gray-300 w-12 h-6 rounded" />
      </div>
    </div>
  )
}

