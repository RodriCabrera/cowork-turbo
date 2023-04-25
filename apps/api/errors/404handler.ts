import { NextFunction, Request, Response } from 'express'
import CustomError, { ERROR_CODES } from './customError'

export default function handler(
  req: Request,
  _res: Response,
  _next: NextFunction
) {
  throw new CustomError(
    `${req.path} does not exist or doesn't allow method ${req.method}`,
    405,
    ERROR_CODES.MethodNotAllowed
  )
}
