import { PrismaClient } from '@prisma/client'
import CustomError, { ERROR_CODES } from '../errors/customError'
import { genSalt, hash, compare } from 'bcryptjs'
import { v4 as uuid } from 'uuid'
import jwt from 'jsonwebtoken'
import MailService from '../mail/mailService'
import PrismaErrors from '../errors/prismaErrors'
import { loginTemplate } from '../mail/templates'
import config from '../config/config'

export default class SuperAdminService {
  static _client = new PrismaClient()

  static async sendAuthEmail(email: string): Promise<boolean> {
    try {
      const salt = await genSalt(10)
      const token = uuid()
      const cryptedToken = await hash(token, salt)
      const superAdmin = await this._client.superAdmin.update({
        where: {
          mail: email
        },
        data: {
          token: cryptedToken
        }
      })
      const userJWT = jwt.sign(
        {
          ...superAdmin,
          token
        },
        config.sessionSecret
      )
      const mailService = MailService.getInstance()
      await mailService.sendMail({
        from: 'noreply@localhost.com',
        to: superAdmin.mail,
        subject: 'Login to your account',
        html: loginTemplate(superAdmin?.name || '', userJWT, 'superadmin')
      })
      return true
    } catch (err) {
      PrismaErrors.parseError(err, 'Superadmin')
      return false
    }
  }

  static async checkAuthorization(id: string, token: string): Promise<boolean> {
    try {
      const superAdmin = await this._client.superAdmin.findUniqueOrThrow({
        where: { id }
      })
      if (superAdmin.token && (await compare(token, superAdmin.token))) {
        await this._client.superAdmin.update({
          where: {
            id: superAdmin.id
          },
          data: {
            token: null
          }
        })
        return true
      }
      throw new CustomError(
        'Invalid token',
        401,
        ERROR_CODES.TokenExpiredOrInvalid
      )
    } catch (err) {
      throw PrismaErrors.parseError(err, 'Superadmin')
    }
  }
}
