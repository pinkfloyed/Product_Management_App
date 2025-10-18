// // components/Searchinput.tsx

// 'use client'
// import { useEffect, useState } from 'react'

// interface Props {
//   value?: string
//   onChange: (val: string) => void
// }

// export default function SearchInput({ value='', onChange }: Props) {
//   const [q, setQ] = useState(value)

//   useEffect(() => {
//     const id = setTimeout(() => onChange(q), 300)
//     return () => clearTimeout(id)
//   }, [q])

//   return (
//     <input
//       value={q}
//       onChange={(e) => setQ(e.target.value)}
//       placeholder="Search products..."
//       className="w-full md:w-80 p-2 border rounded"
//     />
//   )
// }


type Props = {
  value: string
  onChange: (v: string) => void
}

export default function SearchInput({ value, onChange }: Props) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search products..."
      className="p-2 border rounded w-full md:w-64"
    />
  )
}
