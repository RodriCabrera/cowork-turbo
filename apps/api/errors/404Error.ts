import CustomError, { ERROR_CODES, ErrorCode } from './customError'

export default class NotFoundError extends CustomError {
  constructor(element: string = 'Resource', code?: ErrorCode) {
    super(`${element} not found.`, 404, code || ERROR_CODES.RecordNotFound)
  }
}
