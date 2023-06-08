import { useQuery } from 'react-query'

import { UserGetRes } from '@/../../packages/types'

import Axios from '@/common/utils/axios'
import { Auth } from '@/modules/auth/types'
import { getCredits } from '../endpoints'

export const useFetchCredits = (
  user: (UserGetRes & { token: string } & Auth) | null,
  walletId: string | undefined
) => {
  const api = Axios.getInstance(user?.access_token)

  const { isLoading: isCreditsLoading, data: creditsData } = useQuery({
    queryKey: ['credits', { id: walletId }],
    queryFn: () => getCredits(api, walletId),
    refetchOnWindowFocus: false
  })

  return { creditsData, isCreditsLoading }
}
