import { AxiosInstance } from 'axios'

import { CompanyGetOneRes, EmployeeAddReq } from 'types'

export const getCompany = async (
  api: AxiosInstance,
  companyId: string | undefined
) => await api.get<CompanyGetOneRes>(`/companies/${companyId}`)

export const addEmployees = async (
  api: AxiosInstance,
  companyId: string | undefined,
  employees: EmployeeAddReq
) =>
  await api.post<
    EmployeeAddReq,
    {
      sent: boolean
      email: string
    }[]
  >(`/companies/${companyId}/employees`, employees)
