import { useQuery } from 'react-query'

import { UserGetRes } from '@/../../packages/types'

import Axios from '@/common/api/axios'
import { Auth } from '@/modules/auth/types'
import { getCredits } from '../api/queryFunctions'

// TODO: Use type from package
export interface GetCreditsRes {
  CreditAssign: any
  credits: number
  id: string
}

export const useFetchCredits = (
  user: (UserGetRes & { token: string } & Auth) | null,
  walletId: string | undefined
) => {
  const api = Axios.getInstance(user?.access_token)

  const { isLoading, data, isFetching } = useQuery<GetCreditsRes>({
    queryKey: ['credits', { id: walletId }],
    queryFn: () => getCredits(api, walletId),
    enabled: !!walletId
  })

  return { creditsData: data, isLoading, isFetching }
}
