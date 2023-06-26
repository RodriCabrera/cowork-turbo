import { useInfiniteQuery } from 'react-query'
import { CoworkFullGetRes } from 'types'
import Axios from '@/common/utils/axios'

export const useInfiniteCoworks = () => {
  const api = Axios.getInstance()
  const COWORKS_COUNT = 3

  const fetchCoworks = ({ pageParam = '' }) =>
    api<CoworkFullGetRes>(
      `/coworks?count=${COWORKS_COUNT}&cursor=${pageParam}`
    ).then((res) => res.data)

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status
  } = useInfiniteQuery('coworks', fetchCoworks, {
    getNextPageParam: (lastPage, pages) => {
      // TODO: We might need a 'lastPage.totalPages' field in order to know when to stop in advance
      return lastPage?.cursor
    },
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
