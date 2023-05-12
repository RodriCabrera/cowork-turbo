import { PrismaClient } from '@prisma/client'
import { compare, genSalt, hash } from 'bcryptjs'
import CustomError, { ERROR_CODES } from '../errors/customError'
import PrismaErrors from '../errors/prismaErrors'
import { v4 as uuid } from 'uuid'
import jwt from 'jsonwebtoken'
import MailService from '../mail/mailService'
import { loginTemplate } from '../mail/templates'
import config from '../config/config'

export default class UserService {
  private static _client = new PrismaClient()
  static async fetchAll() {
    this._client.$connect()
    try {
      const response = this._client.user.findMany()
      return response
    } catch (err) {
      console.error(err)
    } finally {
      this._client.$disconnect()
    }
  }

  static async fetchById(id: string) {
    this._client.$connect()
    try {
      const response = this._client.user.findUnique({
        where: {
          id
        }
      })
      return response
    } catch (err) {
      console.error(err)
    } finally {
      this._client.$disconnect()
    }
  }

  static async sendAuthEmail(email: string): Promise<boolean> {
    this._client.$connect()
    try {
      const salt = await genSalt(10)
      const token = uuid()
      const cryptedToken = await hash(token, salt)
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
    } finally {
      this._client.$disconnect()
    }
  }

  static async checkAuthorization(id: string, token: string): Promise<boolean> {
    this._client.$connect()
    try {
      const user = await this._client.user.findUniqueOrThrow({
        where: { id }
      })
      if (user.token && (await compare(token, user.token))) {
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
      throw PrismaErrors.parseError(err, 'User')
    } finally {
      this._client.$disconnect()
    }
  }
}
