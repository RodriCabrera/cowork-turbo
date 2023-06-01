import { PrismaClient } from '@prisma/client'
import PrismaErrors from '../errors/prismaErrors'
import { AddCreditsInput, CreditsAssignedResponse } from './creditsTypes'
import PublicUserDTO from '../users/DTOs/publicUser.dto'

export default class CreditsService {
  private static _client = new PrismaClient()

  static async getById(id: string) {
    try {
      return await this._client.wallet.findUniqueOrThrow({
        where: { id },
        include: {
          CreditAssign: true
        }
      })
    } catch (err) {
      PrismaErrors.parseError(err)
    }
  }

  static async addCredits(id: string, data: AddCreditsInput) {
    try {
      return await this._client.wallet.update({
        where: { id },
        data: {
          credits: {
            increment: data.ammount
          }
        }
      })
    } catch (err) {
      PrismaErrors.parseError(err)
    }
  }

  static async assignCreditsToEmployee(
    id: string,
    employeeId: string,
    data: AddCreditsInput
  ): Promise<CreditsAssignedResponse | undefined> {
    try {
      const assignation = await this._client.creditAssign.create({
        data: {
          ammount: data.ammount,
          userId: employeeId,
          walletId: id
        },
        include: {
          User: true
        }
      })
      const totalCredits = await this._client.creditAssign.aggregate({
        _sum: {
          ammount: true
        },
        where: {
          userId: assignation.userId
        }
      })
      return {
        employee: new PublicUserDTO(assignation.User),
        credits: totalCredits._sum.ammount
      }
    } catch (err) {
      PrismaErrors.parseError(err)
    }
  }
}
