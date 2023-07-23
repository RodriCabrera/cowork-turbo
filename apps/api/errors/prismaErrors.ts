import { Prisma } from '@prisma/client'
import CustomError, { ERROR_CODES } from './customError'
import NotFoundError from './404Error'

export default class PrismaErrors {
  static ERROR_CODES = {
    ValueTooLarge: 'P2000',
    ConditionNotMatched: 'P2001',
    ValueTypeInvalid: 'P2006',
    MissingValue: 'P2012',
    ChangeViolatesRelation: 'P2014',
    RelatedRecordNotFound: 'P2015',
    ValueOutOfRange: 'P2020',
    RecordNotFound: 'P2025'
  }

  static parseError(
    error: unknown,
    collection: string | string[] = 'Record',
    debug: boolean = false
  ) {
    debug && console.error(error)
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case this.ERROR_CODES.RecordNotFound:
          throw new NotFoundError(
            collection.toString(),
            ERROR_CODES.PrismaRecordNotFound
          )
        case this.ERROR_CODES.MissingValue:
          throw new CustomError(
            `Missing data for field of ${collection}: ${error.message}`,
            406,
            ERROR_CODES.PrismaMissingValue
          )
        case this.ERROR_CODES.ValueTypeInvalid:
          throw new CustomError(
            `Value type for field of ${collection} is not valid: ${error.message}`,
            406,
            ERROR_CODES.PrismaValueNotValid
          )
        case this.ERROR_CODES.ValueOutOfRange:
          throw new CustomError(
            `Value for ${collection} out of range: ${error.message}`,
            406,
            ERROR_CODES.PrismaValueNotValid
          )
        case this.ERROR_CODES.ValueTooLarge:
          throw new CustomError(
            `Value for ${collection} is too large: ${error.message}`,
            406,
            ERROR_CODES.PrismaValueNotValid
          )
        default:
          throw new CustomError(
            `Something went wrong with a Prisma client query: ${error}`,
            500,
            ERROR_CODES.PrismaUnhandledError
          )
      }
    } else if (error instanceof Prisma.PrismaClientValidationError) {
      throw new CustomError(error.message, 406, ERROR_CODES.PrismaValueNotValid)
    } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
      throw new Error('Prisma client error')
    }
    return error
  }
}
