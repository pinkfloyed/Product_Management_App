// 'use client';

// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import React from 'react';

// interface PaginationProps {
//   page: number;
//   setPage: React.Dispatch<React.SetStateAction<number>>;
//   canNext: boolean;
// }

// const Pagination: React.FC<PaginationProps> = ({ page, setPage, canNext }) => {
//   const handlePrev = () => {
//     if (page > 0) setPage(page - 1);
//   };

//   const handleNext = () => {
//     if (canNext) setPage(page + 1);
//   };

//   return (
//     <div className="flex items-center justify-center gap-2 mt-4">
//       <button
//         onClick={handlePrev}
//         disabled={page === 0}
//         className="px-3 py-1 border rounded-md disabled:opacity-50 hover:bg-gray-100 flex items-center gap-1"
//       >
//         <ChevronLeft className="w-4 h-4" /> Prev
//       </button>

//       <span className="px-3 py-1 border rounded-md bg-gray-50 text-gray-700">
//         Page {page + 1}
//       </span>

//       <button
//         onClick={handleNext}
//         disabled={!canNext}
//         className="px-3 py-1 border rounded-md disabled:opacity-50 hover:bg-gray-100 flex items-center gap-1"
//       >
//         Next <ChevronRight className="w-4 h-4" />
//       </button>
//     </div>
//   );
// };

// export default Pagination;


type Props = {
  page: number
  setPage: (p: number) => void
  canNext: boolean
}

export default function Pagination({ page, setPage, canNext }: Props) {
  return (
    <div className="flex gap-2">
      <button
        disabled={page === 0}
        onClick={() => setPage(page - 1)}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Prev
      </button>
      <span className="px-3 py-1 border rounded">{page + 1}</span>
      <button
        disabled={!canNext}
        onClick={() => setPage(page + 1)}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  )
}
