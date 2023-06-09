import { z, ZodError } from 'zod'
import CustomError, { ERROR_CODES } from '../errors/customError'

export default class BasicValidator {
  protected static $CUID = z.string().min(1, { message: 'ID is required' })

  static validateCUID(id: any) {
    return this.$CUID.parse(id)
  }

  static parseError(error: unknown) {
    if (error instanceof ZodError) {
      throw new CustomError(error.message, 406, ERROR_CODES.ZodInvalidType)
    }
  }
}
