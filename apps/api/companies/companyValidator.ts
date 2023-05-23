import CustomError, { ERROR_CODES } from '../errors/customError'
import { z, ZodError } from 'zod'

export default class CompanyValidator {
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

  static parseError(error: unknown) {
    if (error instanceof ZodError) {
      throw new CustomError(error.message, 406, ERROR_CODES.ZodInvalidType)
    }
  }
}
