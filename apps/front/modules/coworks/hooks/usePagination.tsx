import { useState } from 'react'

export const usePagination = () => {
  const [pageSize, setPageSize] = useState(10)
  const [pageIndex, setPageIndex] = useState(1)
  const nextPage = () => setPageIndex((prevState) => prevState + 1)
  const prevPage = () => setPageIndex((prevState) => prevState - 1)
  const handlePageSizeChange = (size: number) => setPageSize(size)

  return { pageSize, pageIndex, nextPage, prevPage, handlePageSizeChange }
}
