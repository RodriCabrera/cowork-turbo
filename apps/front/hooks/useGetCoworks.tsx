import { AxiosResponse } from 'axios'
import { useQuery, useQueryClient } from 'react-query'

import { CoworkFullGetRes } from '@/../../packages/types'
import { useApi } from '@/context/apiContext'

export const useGetCoworks = ({ pageIndex, pageSize }: any) => {
  const queryClient = useQueryClient()
  const api = useApi()
  console.log('TODO?')

  const getCoworks = async (page: number) =>
    await api.get(`/coworks?count=${pageSize}&page=${page}`)

  const { isLoading, isError, data, isFetching, isPreviousData } = useQuery<
    AxiosResponse<CoworkFullGetRes>
  >({
    queryKey: ['coworks', pageIndex],
    queryFn: () => getCoworks(pageIndex),
    keepPreviousData: true
  })

  const prefetchNext = () => {
    queryClient.prefetchQuery({
      queryKey: ['coworks', pageIndex + 1],
      queryFn: () => getCoworks(pageIndex + 1),
      staleTime: 5000
    })
  }

  return {
    coworks: data?.data.results,
    isLoading,
    isFetching,
    isError,
    isPreviousData,
    prefetchNext,
    totalPages: Number(data?.data.totalPages || 1)
  }
}
