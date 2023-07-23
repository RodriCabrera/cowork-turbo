import { z } from 'zod'
import BasicValidator from '../utils/basicValidator'

export default class UserValidate extends BasicValidator {
  //   private static $roleEnumValues = ['ADMIN', 'USER']

  private static $baseUserSchema = z.object({
    email: z.string().email(),
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
}
