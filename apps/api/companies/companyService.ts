import { PrismaClient, User } from '@prisma/client'
import prisma from '../prisma/client'
import PrismaErrors from '../errors/prismaErrors'
import { CompanyEditInput, CompanyGetById, EmployeeInput } from './companyTypes'
import CompanyValidator from './companyValidator'
import CustomError, { ERROR_CODES } from '../errors/customError'
import PublicUserDTO from '../users/DTOs/publicUser.dto'
import MailService from '../mail/mailService'
import { invitationTemplate } from '../mail/templates'
import AuthUtils from '../utils/auth.utils'

export default class CompanyService {
  private static _client = prisma
  static async fetchAll() {
    try {
      const response = await this._client.company.findMany()
      return response
    } catch (err) {
      PrismaErrors.parseError(err, 'Company')
    }
  }

  static async fetchById(id: string): Promise<CompanyGetById | undefined> {
    try {
      const response = await this._client.company.findUniqueOrThrow({
        where: {
          id
        },
        include: {
          employees: true,
          Wallet: true
        }
      })
      if (response) {
        return {
          ...response,
          employees: response.employees.map((e) => new PublicUserDTO(e))
        }
      } else return undefined
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
  private static async $sendEmployeeMails(
    employees: User[],
    companyName: string
  ) {
    const mailer = MailService.getInstance()
    return Promise.all(
      employees.map(async (employee) => ({
        email: employee.email,
        sent: await mailer.sendMail({
          from: 'bloom@bloom.com',
          to: employee.email,
          subject: 'Invitation to Bloom',
          html: invitationTemplate(
            [employee.firstName, employee.lastName].join(' '),
            AuthUtils.createJWT({
              ...new PublicUserDTO(employee),
              token: employee.token
            }),
            companyName
          )
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
      const companyData = await this._client.company.findUniqueOrThrow({
        where: { id: idCompany },
        include: { employees: { where: { id: userId } } }
      })
      // temp fix -> TODO: Handle existing mail changes and deletes
      // const filteredEmployees = employeeData.filter(
      //   (employee) =>
      //     companyData.employees.filter((e) => e.email === employee.email)
      //       .length === 0
      // )
      const filteredEmployees = await Promise.all(
        employeeData.map(async (employee) => {
          const { token, cryptedToken } = await AuthUtils.generateHashToken()
          return { ...employee, token, cryptedToken }
        })
      )
      // ***
      const newEmployees = await this._client.$transaction(
        filteredEmployees.map(({ token, cryptedToken, ...employee }) =>
          this._client.user.create({
            data: {
              ...employee,
              token: cryptedToken,
              company: { connect: { id: idCompany } }
            }
          })
        )
      )
      return this.$sendEmployeeMails(
        newEmployees.map((e) => ({
          ...e,
          token:
            filteredEmployees.find((u) => u.email === e.email)?.token || null
        })),
        companyData.name
      )
    } catch (err) {
      PrismaErrors.parseError(err, 'Company')
      CompanyValidator.parseError(err)
      if (err instanceof Error) throw err
    }
  }
}
