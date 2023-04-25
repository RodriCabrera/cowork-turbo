import { NextFunction, Request, Response } from 'express'
import CustomError from './customError'

export default function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err) {
    if (err instanceof CustomError) {
      res.status(err.status)
      res.json(err.toJSON())
    }
  } else {
    res.status(500)
    res.json({
      message: 'Internal server error',
      code: 'unexpected_error',
      status: 500
    })
  }
}
