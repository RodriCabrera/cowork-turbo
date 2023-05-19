import CompanyValidator from './companyValidator'

const editCompanySchema = CompanyValidator.getCompanyEditSchema()

export type CompanyEditInput = ReturnType<typeof editCompanySchema.parse>
