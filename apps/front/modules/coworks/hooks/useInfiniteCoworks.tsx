import { useInfiniteQuery } from 'react-query'

import { COWORKS } from '../constants'
import { getCoworks } from '../api/queryFunctions'

export const useInfiniteCoworks = (amount: number = 3) => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status
  } = useInfiniteQuery(
    COWORKS,
    ({ pageParam }) =>
      getCoworks({
        pageIndex: undefined,
        pageSize: amount.toString(),
        pageParam
      }),
    {
      getNextPageParam: (lastPage) => lastPage?.cursor,
      refetchOnWindowFocus: false
    }
  )

  return {
    data,
    error,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
    status
  }
}
