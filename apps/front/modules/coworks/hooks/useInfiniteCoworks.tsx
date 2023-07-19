import { useInfiniteQuery } from 'react-query'

import { COWORKS } from '../constants'
import { getCoworks } from '../api/queryFunctions'

export const useInfiniteCoworks = () => {
  // TODO: TEST IF CAN BE REMOVED / and use the imported query fn
  // const api = Axios.getInstance()
  // const COWORKS_COUNT = 3

  // const fetchCoworks = ({ pageParam = '' }) =>
  //   api<CoworkFullGetRes>(
  //     `/coworks?count=${COWORKS_COUNT}&cursor=${pageParam}`
  //   ).then((res) => res.data)

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status
  } = useInfiniteQuery(COWORKS, getCoworks, {
    getNextPageParam: (lastPage) => lastPage?.cursor,
    refetchOnWindowFocus: false
  })

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
