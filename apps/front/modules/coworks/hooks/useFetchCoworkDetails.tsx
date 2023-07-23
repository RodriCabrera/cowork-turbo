import { useQuery } from 'react-query'
import { AxiosResponse } from 'axios'

import { SingleCoworkFullGetRes } from 'types'
import { getCoworkDetails } from '../api/queryFunctions'

export const useFetchCoworkDetails = (coworkId: string) => {
  const { isLoading, data, isError, isFetched } = useQuery<
    AxiosResponse<SingleCoworkFullGetRes>
  >({
    queryKey: [`cowork-${coworkId}`],
    queryFn: () => getCoworkDetails(coworkId)
  })

  return { isLoading, isError, coworkDetails: data?.data, isFetched }
}
