import { Request, Response, NextFunction } from 'express'
import { PrismaClient, Role } from '@prisma/client'
import { verify, JwtPayload } from 'jsonwebtoken'
import CustomError, { ERROR_CODES } from '../errors/customError'
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError
} from '@prisma/client/runtime/library'
import config from '../config/config'

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
    const bearerToken = req.headers['authorization']
    if (!bearerToken) throw new Error('No authorization token was found')
    const token = bearerToken.split(' ')[1]
    return token
  }

  private static _verifyToken(req: Request) {
    const token = Auth._getAuthTokenFromHeader(req)
    return verify(token, config.sessionSecret)
  }

  static async authorizeSuperAdmin(
    req: Request,
    _res: Response,
    next: NextFunction
  ) {
    try {
      const token = Auth._verifyToken(req) as JwtPayload
      if (Object.hasOwn(token, 'id')) {
        const superadmin = await Auth._client.superAdmin.findUniqueOrThrow({
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

  static async authorizeUser(req: Request, _res: Response, next: NextFunction) {
    try {
      const token = Auth._verifyToken(req) as JwtPayload
      if (Object.hasOwn(token, 'id')) {
        const user = await Auth._client.user.findUniqueOrThrow({
          where: { id: token.id }
        })
        req.user = {
          role: user.role === 'ADMIN' ? 'admin' : 'user',
          id: user.id
        }
        return next()
      }
      throw new Error('No property id was found on auth token')
    } catch (err) {
      const authError = Auth._createAuthError(err)
      return next(authError)
    }
  }

  static async authorizeAdmin(
    req: Request,
    _res: Response,
    next: NextFunction
  ) {
    try {
      const token = Auth._verifyToken(req) as JwtPayload
      if (Object.hasOwn(token, 'id')) {
        const user = await Auth._client.user.findUniqueOrThrow({
          where: { id: token.id }
        })
        if (user.role !== Role.ADMIN) {
          throw new Error('Admin credentials required')
        }
        req.user = {
          role: 'admin',
          id: user.id
        }
        return next()
      }
      throw new Error('No property id was found on auth token')
    } catch (err) {
      const authError = Auth._createAuthError(err)
      return next(authError)
    }
  }
}
