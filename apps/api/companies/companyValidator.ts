import { z } from 'zod'
import BasicValidator from '../utils/basicValidator'

export default class CompanyValidator extends BasicValidator {
  private static $companyEditSchema = z.object({
    name: z.string().optional(),
    email: z.string().optional()
  })

  static getCompanyEditSchema() {
    return this.$companyEditSchema
  }

  static validateEdit(data: any) {
    return this.$companyEditSchema.parse(data)
  }
}
