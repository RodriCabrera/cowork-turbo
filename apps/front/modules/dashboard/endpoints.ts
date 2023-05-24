import { AxiosInstance } from 'axios'

export const getCompany = async (
  api: AxiosInstance,
  companyId: string | undefined
) => await api.get(`/companies/${companyId}`)
