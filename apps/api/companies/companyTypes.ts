import CompanyValidator from './companyValidator'
import { Company, User } from '@prisma/client'

const editCompanySchema = CompanyValidator.getCompanyEditSchema()
export type EmployeeInput = {
  name?: string
  email: string
}

export type CompanyEditInput = ReturnType<typeof editCompanySchema.parse>
export type CompanyGetById = Company & { employees: User[] }
export type CompanyGetAll = Company[]
