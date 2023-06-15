import { useInfiniteQuery } from 'react-query'
import { CoworkFullGetRes } from 'types'
import Axios from '@/common/utils/axios'

export const useInfiniteCoworks = () => {
  const api = Axios.getInstance()

  const fetchCoworks = ({ pageParam = '' }) =>
    // TODO: Define count number
    api<CoworkFullGetRes>('/coworks?count=1&cursor=' + pageParam).then(
      (res) => res.data
    )

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
      // TODO: We might need a 'lastPage.totalPages' field in order to know when to stop
      return lastPage?.cursor
    }
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
