import { AxiosResponse } from 'axios'
import { useQuery } from 'react-query'

import { CoworkFullGetRes } from '@/../../packages/types'

import { getCoworks } from '../endpoints'

interface useGetCoworksParams {
  pageIndex?: string
  pageSize?: string
}

export const useGetCoworks = ({ pageIndex, pageSize }: useGetCoworksParams) => {
  const { isLoading, isError, data, isFetching, isPreviousData } = useQuery<
    AxiosResponse<CoworkFullGetRes>
  >({
    queryKey: ['coworks', { pageSize, pageIndex }],
    queryFn: () => getCoworks({ pageIndex, pageSize }),
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
