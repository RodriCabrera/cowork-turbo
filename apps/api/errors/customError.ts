import { ErrorInterface } from './errorInterface'

export const ERROR_CODES = {
  MethodNotAllowed: 'route_or_method_not_allowed',
  TokenExpiredOrInvalid: 'invalid_or_expired_token',
  PrismaRecordNotFound: 'prisma_error_record_not_found',
  PrismaMissingValue: 'prisma_error_missing_value',
  PrismaValueNotValid: 'prisma_error_invalid_value',
  PrismaUnhandledError: 'prisma_error_unknown',
  ZodInvalidType: 'zod_error_invalid_type',
  Unauthorized: 'auth_error_unauthorized'
} as const

type ErrorCodeKeys = keyof typeof ERROR_CODES
export type ErrorCode = (typeof ERROR_CODES)[ErrorCodeKeys]

export default class CustomError extends Error {
  status: ErrorInterface['status']
  message: ErrorInterface['message']
  code?: ErrorInterface['code']

  constructor(
    message: ErrorInterface['message'],
    status?: ErrorInterface['status'],
    code?: ErrorInterface['code']
  ) {
    super()
    this.code = code
    this.message = message
    this.status = status
  }

  toJSON() {
    return {
      error: {
        message: this.message,
        code: this.code || 'error_not_indexed',
        status: this.status
      }
    }
  }
}
