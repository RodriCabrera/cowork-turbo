import { useInfiniteQuery } from 'react-query'
import { AxiosError } from 'axios'

import { CoworkFullGetRes } from 'types'
import { COWORKS } from '../constants'
import { getCoworks } from '../api/queryFunctions'

export const useInfiniteCoworks = (pageSize = '6') => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status
  } = useInfiniteQuery<CoworkFullGetRes, AxiosError>(
    COWORKS,
    ({ pageParam }) =>
      getCoworks({
        pageSize,
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
