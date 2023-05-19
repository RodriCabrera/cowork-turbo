import { PrismaClient } from '@prisma/client'
import PrismaErrors from '../errors/prismaErrors'
import { CompanyEditInput } from './companyTypes'
import CompanyValidator from './companyValidator'
import CustomError, { ERROR_CODES } from '../errors/customError'

export default class CompanyService {
  private static _client = new PrismaClient()
  static async fetchAll() {
    try {
      const response = await this._client.company.findMany()
      return response
    } catch (err) {
      PrismaErrors.parseError(err, 'Company')
    }
  }

  static async fetchById(id: string) {
    try {
      const response = await this._client.company.findUnique({
        where: {
          id
        },
        include: {
          employees: true
        }
      })
      return response
    } catch (err) {
      PrismaErrors.parseError(err, 'Company')
    }
  }

  static async editById(id: string, data: CompanyEditInput, userId: string) {
    try {
      const parsedData = CompanyValidator.validateEdit(data)
      const company = await this._client.company.findUnique({
        where: { id },
        include: { employees: { where: { id: userId } } }
      })
      if (!company) {
        throw new CustomError(
          'Unauthorized',
          401,
          ERROR_CODES.Unauthorized_foreign_company
        )
      }
      return await this._client.company.update({
        where: {
          id
        },
        data: {
          name: parsedData.name,
          email: parsedData.email
        }
      })
    } catch (err) {
      PrismaErrors.parseError(err, 'Company')
      CompanyValidator.parseError(err)
      if (err instanceof Error) throw err
    }
  }
}
