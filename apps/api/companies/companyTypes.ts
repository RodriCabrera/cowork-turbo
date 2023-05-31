import CompanyValidator from './companyValidator'
import { Company, User } from '@prisma/client'
import { PublicUser } from '../users/userTypes'

const editCompanySchema = CompanyValidator.getCompanyEditSchema()
export type EmployeeInput = {
  firstName?: string
  lastName?: string
  email: string
}

export type CompanyEditInput = ReturnType<typeof editCompanySchema.parse>
export type CompanyGetById = Company & { employees: PublicUser[] }
export type CompanyGetAll = Company[]
export type CompanyEmployeeAdded = {
  email: User['email']
  sent: boolean
}[]
