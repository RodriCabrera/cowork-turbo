import { PrismaClient, User } from '@prisma/client'
import PrismaErrors from '../errors/prismaErrors'
import { CompanyEditInput, EmployeeInput } from './companyTypes'
import CompanyValidator from './companyValidator'
import CustomError, { ERROR_CODES } from '../errors/customError'
import MailService from '../mail/mailService'

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

  // TODO: Create and connect mail template
  private static async $sendEmployeeMails(employees: User[]) {
    const mailer = MailService.getInstance()
    return Promise.all(
      employees.map(async (employee) => ({
        email: employee.email,
        sent: await mailer.sendMail({
          from: 'bloom@bloom.com',
          to: employee.email,
          subject: 'Invitation to Bloom',
          text: 'You are invited'
        })
      }))
    )
  }

  static async createEmployees(
    idCompany: string,
    employeeData: EmployeeInput[],
    userId: string
  ) {
    try {
      await this._client.company.findUniqueOrThrow({
        where: { id: idCompany },
        include: { employees: { where: { id: userId } } }
      })
      const newEmployees = await this._client.$transaction(
        employeeData.map((employee) =>
          this._client.user.create({
            data: { ...employee, company: { connect: { id: idCompany } } }
          })
        )
      )
      return this.$sendEmployeeMails(newEmployees)
    } catch (err) {
      PrismaErrors.parseError(err, 'Company')
      CompanyValidator.parseError(err)
      if (err instanceof Error) throw err
    }
  }
}
