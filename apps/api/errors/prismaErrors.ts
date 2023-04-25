import { Prisma } from '@prisma/client'

export default class PrismaErrors {
  static ERROR_CODES = {
    RecordNotFound: 'P2025'
  }

  static parseError(error: unknown) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === this.ERROR_CODES.RecordNotFound) {
        throw new Error('Record not found')
      }
      console.log(error)
    } else if (error instanceof Prisma.PrismaClientValidationError) {
      throw new Error('Invalid data')
    } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
      throw new Error('Prisma client error')
    }
    return error
  }
}
