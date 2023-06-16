import { AxiosResponse } from 'axios'
import { useQuery } from 'react-query'

import { CoworkFullGetRes } from '@/../../packages/types'

import { getCoworks } from '../endpoints'

interface useGetCoworksParams {
  pageIndex?: number
  pageSize?: number
}

export const useGetCoworks = ({ pageIndex, pageSize }: useGetCoworksParams) => {
  const { isLoading, isError, data, isFetching, isPreviousData } = useQuery<
    AxiosResponse<CoworkFullGetRes>
  >({
    queryKey: ['coworks', { pageSize, pageIndex }],
    queryFn: () => getCoworks({ pageIndex: pageIndex?.toString(), pageSize: pageSize?.toString() }),
    keepPreviousData: true,
    refetchOnWindowFocus: true
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
