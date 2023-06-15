import { useInfiniteQuery } from 'react-query'
import { CoworkFullGetRes } from 'types'
import Axios from '@/common/utils/axios'

export const useInfiniteCoworks = () => {
  const api = Axios.getInstance()

  const fetchCoworks = ({ pageParam = '' }) =>
    api('/coworks?count=1&cursor=' + pageParam).then(res => res.data) as Promise<CoworkFullGetRes>

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
      return lastPage.cursor || undefined
    }
  })
  return { data, hasNextPage, fetchNextPage }
}
