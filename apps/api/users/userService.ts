import { PrismaClient } from '@prisma/client'
import CustomError, { ERROR_CODES } from '../errors/customError'
import PrismaErrors from '../errors/prismaErrors'
import jwt from 'jsonwebtoken'
import MailService from '../mail/mailService'
import { loginTemplate } from '../mail/templates'
import config from '../config/config'
import AuthUtils from '../utils/auth.utils'

export default class UserService {
  private static _client = new PrismaClient()

  static async fetchAll() {
    try {
      const response = this._client.user.findMany()
      return response
    } catch (err) {
      console.error(err)
    }
  }

  static async fetchById(id: string) {
    try {
      const response = this._client.user.findUnique({
        where: {
          id
        }
      })
      return response
    } catch (err) {
      console.error(err)
    }
  }

  static async sendAuthEmail(email: string): Promise<boolean> {
    try {
      const { token, cryptedToken } = await AuthUtils.generateHashToken()
      const user = await this._client.user.update({
        where: {
          mail: email
        },
        data: {
          token: cryptedToken
        }
      })
      const userJWT = jwt.sign(
        {
          ...user,
          token
        },
        config.sessionSecret
      )
      const mailService = MailService.getInstance()
      await mailService.sendMail({
        from: 'noreply@localhost.com',
        to: user.mail,
        subject: 'Login to your account',
        html: loginTemplate(
          `${user.firstName} ${user.lastName}`,
          userJWT,
          user.role
        )
      })
      return true
    } catch (err) {
      PrismaErrors.parseError(err, 'User')
      return false
    }
  }

  static async checkAuthorization(id: string, token: string): Promise<boolean> {
    try {
      const user = await this._client.user.findUniqueOrThrow({
        where: { id }
      })
      if (user.token && (await AuthUtils.compareHashToken(token, user.token))) {
        await this._client.user.update({
          where: {
            id: user.id
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
      PrismaErrors.parseError(err, 'User')
      return false
    }
  }

  static async createAdmin() {
    try {
      const createdAdmin = await this._client.user.create({
        data: {
          mail: '',
          firstName: '',
          lastName: '',
          role: 'ADMIN',
          company: {
            create: {
              name: '',
              email: ''
            }
          }
        }
      })
    } catch (err) {
      PrismaErrors.parseError(err, 'User/admin')
    }
  }
}
