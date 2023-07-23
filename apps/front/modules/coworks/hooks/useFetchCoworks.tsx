import { useQuery } from 'react-query'

import { getCoworks } from '../api/queryFunctions'
import { COWORKS } from '../constants'

interface useFetchCoworksParams {
  pageIndex?: number
  pageSize?: number
}

export const useFetchCoworks = ({
  pageIndex,
  pageSize
}: useFetchCoworksParams) => {
  const { isLoading, isError, data, isFetching, isPreviousData } = useQuery({
    queryKey: [COWORKS, { pageSize, pageIndex }],
    queryFn: () =>
      getCoworks({
        pageIndex: pageIndex?.toString(),
        pageSize: pageSize?.toString()
      })
  })

  return {
    coworks: data?.results,
    isLoading,
    isFetching,
    isError,
    isPreviousData,
    totalPages: Number(data?.totalPages || 1)
  }
}
