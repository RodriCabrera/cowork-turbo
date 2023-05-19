import { z, ZodError } from 'zod'
import CustomError, { ERROR_CODES } from '../errors/customError'

export default class UserValidate {
  //   private static $roleEnumValues = ['ADMIN', 'USER']

  private static $baseUserSchema = z.object({
    mail: z.string().email(),
    firstName: z.string().nullish(),
    lastName: z.string().nullish()
  })

  private static $createAdminSchema = this.$baseUserSchema.extend({
    company: z.object({
      name: z.string(),
      email: z.string().email().nullish()
    })
  })

  static validateCreateAdmin(data: any) {
    return this.$createAdminSchema.parse(data)
  }

  static getCreateAdminSchema() {
    return this.$createAdminSchema
  }

  static parseError(error: unknown) {
    if (error instanceof ZodError) {
      throw new CustomError(error.message, 406, ERROR_CODES.ZodInvalidType)
    }
  }
}
