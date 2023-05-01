import { Request, Response, NextFunction } from 'express'
import { PrismaClient } from '@prisma/client'
import { verify, JwtPayload } from 'jsonwebtoken'
import CustomError, { ERROR_CODES } from '../errors/customError'
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError
} from '@prisma/client/runtime'

export default class Auth {
  private static _client = new PrismaClient()

  private static _createAuthError(err: unknown) {
    const hasKnownMessage =
      err instanceof Error ||
      err instanceof PrismaClientKnownRequestError ||
      err instanceof PrismaClientValidationError
    return new CustomError(
      `Unauthorized: ${hasKnownMessage ? err.message : 'No message'}`,
      401,
      ERROR_CODES.Unauthorized
    )
  }

  private static _getAuthTokenFromHeader(req: Request) {
    const token = req.headers['authorization']
    if (!token) throw new Error('No authorization token was found')
    return token
  }

  private static _verifyToken(req: Request) {
    const token = Auth._getAuthTokenFromHeader(req)
    return verify(token, process.env.SESSION_SECRET)
  }

  static async authorizeSuperAdmin(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const token = Auth._verifyToken(req) as JwtPayload
      if (Object.hasOwn(token, 'id')) {
        const superadmin = await this._client.superAdmin.findUniqueOrThrow({
          where: { id: token.id }
        })
        req.user = {
          role: 'superadmin',
          id: superadmin.id
        }
        return next()
      }
      throw new Error('No property id was found on auth token')
    } catch (err) {
      const authError = Auth._createAuthError(err)
      return next(authError)
    }
  }

  static async authorizeUser(req: Request, res: Response, next: NextFunction) {}
  static async authorizeAdmin(
    req: Request,
    res: Response,
    next: NextFunction
  ) {}
}
