import { AxiosResponse } from 'axios'
import { useQuery } from 'react-query'

import { CoworkFullGetRes } from '@/../../packages/types'

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
  const { isLoading, isError, data, isFetching, isPreviousData } = useQuery<
    AxiosResponse<CoworkFullGetRes>
  >({
    queryKey: [COWORKS, { pageSize, pageIndex }],
    queryFn: () =>
      getCoworks({
        pageIndex: pageIndex?.toString(),
        pageSize: pageSize?.toString()
      })
  })

  return {
    coworks: data?.data.results,
    isLoading,
    isFetching,
    isError,
    isPreviousData,
    totalPages: Number(data?.data.totalPages || 1)
  }
}
