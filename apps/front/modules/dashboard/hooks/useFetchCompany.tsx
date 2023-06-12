import { AxiosResponse } from 'axios'
import { useQuery } from 'react-query'

import { CompanyGetOneRes, UserGetRes } from '@/../../packages/types'

import { Auth } from '@/modules/auth/types'
import Axios from '@/common/utils/axios'
import { getCompany } from '../endpoints'

export const useFetchCompany = (
  user: (UserGetRes & { token: string } & Auth) | null
) => {
  const api = Axios.getInstance(user?.access_token)

  const { isLoading: isCompanyLoading, data: companyData } = useQuery<
    AxiosResponse<CompanyGetOneRes>
  >({
    queryKey: ['company', { companyId: user?.companyId }],
    queryFn: () => getCompany(api, user?.companyId),
    refetchOnWindowFocus: false
  })

  return { companyData, isCompanyLoading }
}
