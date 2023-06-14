import React from 'react'
import { useInfiniteQuery } from 'react-query'
import Axios from '@/common/utils/axios'

export const useInfiniteCoworks = () => {
  const api = Axios.getInstance()

  const fetchCoworks = ({ pageParam = 0 }: any) =>
    api('/coworks?count=10&cursor=' + pageParam)

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status
  } = useInfiniteQuery('coworks', fetchCoworks, {
    getNextPageParam: (lastPage: any, pages) => {
      console.log('lastPage', lastPage, 'pages', pages)

      return lastPage.data.cursor
    }
  })
  return { data }
}
