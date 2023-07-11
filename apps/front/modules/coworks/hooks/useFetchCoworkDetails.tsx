import { useQuery } from 'react-query'
import { AxiosResponse } from 'axios'

import { SingleCoworkFullGetRes } from 'types'

import { getCoworkDetails } from '../api/queryFunctions'
import { useApi } from '@/common/hooks/useApi'

export const useFetchCoworkDetails = (coworkId: string) => {
  const api = useApi()

  const { isLoading, data, isError, isFetched } = useQuery<
    AxiosResponse<SingleCoworkFullGetRes>
  >({
    queryKey: [`cowork-${coworkId}`],
    queryFn: () => getCoworkDetails(api, coworkId)
  })

  return { isLoading, isError, coworkDetails: data?.data, isFetched }
}
