import type { ErrorCode } from './customError'

export interface ErrorInterface {
  code: ErrorCode
  status: number
  message: string
}
