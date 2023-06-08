import { AxiosInstance } from 'axios'

import {
  CompanyGetOneRes,
  EmployeeAddReq,
  CompanyPostEmployeesRes
} from 'types'

export const getCompany = async (
  api: AxiosInstance,
  companyId: string | undefined
) => await api.get<CompanyGetOneRes>(`/companies/${companyId}`)

export const getCredits = async (
  api: AxiosInstance,
  companyId: string | undefined
) => await api.get(`/credits/${companyId}`)

export const addEmployees = async (
  api: AxiosInstance,
  companyId: string | undefined,
  employees: EmployeeAddReq
) =>
  await api.post<EmployeeAddReq, CompanyPostEmployeesRes>(
    `/companies/${companyId}/employees`,
    employees
  )
