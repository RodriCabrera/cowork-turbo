import { AxiosResponse } from 'axios'
import { useQuery, useQueryClient } from 'react-query'

import { CoworkFullGetRes } from '@/../../packages/types'
import { useApi } from '@/common/context/apiContext'

export const useGetCoworks = ({ pageIndex, pageSize }: any) => {
  const queryClient = useQueryClient()
  const api = useApi()

  const getCoworks = async (page: number) =>
    await api.get(`/coworks?count=${pageSize}&page=${page}`)

  const { isLoading, isError, data, isFetching, isPreviousData } = useQuery<
    AxiosResponse<CoworkFullGetRes>
  >({
    queryKey: ['coworks', { pageSize, pageIndex }],
    queryFn: () => getCoworks(pageIndex),
    keepPreviousData: true,
    refetchOnWindowFocus: false
  })

  if (data) {
    queryClient.prefetchQuery({
      queryKey: ['coworks', { pageSize, pageIndex: pageIndex + 1 }],
      queryFn: () => getCoworks(pageIndex + 1),
      staleTime: 20000
    })
  }

  return {
    coworks: data?.data.results,
    isLoading,
    isFetching,
    isError,
    isPreviousData,
    totalPages: Number(data?.data.totalPages || 1)
  }
}
