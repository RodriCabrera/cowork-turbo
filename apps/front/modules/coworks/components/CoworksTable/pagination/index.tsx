interface PaginationProps {
  pageIndex: number
  totalPages: number
  handlePageSizeChange: (size: number) => void
  prevPage: () => void
  nextPage: () => void
}

export const Pagination = ({
  pageIndex,
  totalPages,
  handlePageSizeChange,
  prevPage,
  nextPage
}: PaginationProps) => {
  return (
    <div className="flex justify-end pb-8 pt-0">
      <div className="flex items-center gap-4 rounded-md bg-white p-2">
        <div>Page size:</div>
        <select onChange={(e) => handlePageSizeChange(+e.target.value)}>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
        <button
          onClick={prevPage}
          disabled={pageIndex === 1}
          className="cursor-pointer rounded-md border-2 bg-gray-50/100 px-3 py-2 text-sm font-medium"
        >
          {'<'}
        </button>
        <p>
          Page {pageIndex} of {totalPages}
        </p>
        <button
          onClick={nextPage}
          disabled={pageIndex === totalPages}
          className="cursor-pointer rounded-md border-2 bg-gray-50/100 px-3 py-2 text-sm font-medium"
        >
          {'>'}
        </button>
      </div>
    </div>
  )
}
