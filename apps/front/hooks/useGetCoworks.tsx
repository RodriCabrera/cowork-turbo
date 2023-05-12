import { useState } from 'react'
import { AxiosResponse } from 'axios'
import { useQuery } from 'react-query'

import { CoworkFullGetRes } from '@/../../packages/types'
import { useApi } from '@/context/apiContext'

export const useGetCoworks = () => {
  const api = useApi()
  const [pageSize, setPageSize] = useState(2)
  const [cursor, setCursor] = useState<string>('')

  const getCoworks = async () =>
    await api.get(`/coworks?count=${pageSize}&cursor=${cursor}`)

  const { isLoading, isError, error, data, isFetching, isPreviousData } =
    useQuery<AxiosResponse<CoworkFullGetRes>>({
      queryKey: ['coworks', cursor],
      queryFn: () => getCoworks(),
      keepPreviousData: true
    })

  const nextPage = () => setCursor(data?.data.cursor || '')

  return { isLoading, coworks: data?.data.results, pageSize, nextPage }
}
