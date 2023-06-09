import { PrismaClient } from '@prisma/client'
import PrismaErrors from '../errors/prismaErrors'
import { AddCreditsInput, CreditsAssignedResponse } from './creditsTypes'
import CreditsValidation from './creditsValidation'
import PublicUserDTO from '../users/DTOs/publicUser.dto'

export default class CreditsService {
  private static _client = new PrismaClient()

  static async getById(id: string) {
    try {
      const validId = CreditsValidation.validateCUID(id)
      return await this._client.wallet.findUniqueOrThrow({
        where: { id: validId },
        include: {
          CreditAssign: true
        }
      })
    } catch (err) {
      PrismaErrors.parseError(err)
      CreditsValidation.parseError(err)
    }
  }

  static async addCredits(
    walletId: string,
    ammount: AddCreditsInput['ammount']
  ) {
    try {
      const validated = CreditsValidation.validateAddInput(walletId, ammount)
      return await this._client.wallet.update({
        where: { id: validated.walletId },
        data: {
          credits: {
            increment: validated.ammount
          }
        }
      })
    } catch (err) {
      PrismaErrors.parseError(err)
      CreditsValidation.parseError(err)
    }
  }

  static async getCreditsAssignedToEmployee(walletId: string, userId: string) {
    try {
      const validated = CreditsValidation.validateAssignedGetInput(
        walletId,
        userId
      )
      return await this._client.creditAssign.findMany({
        where: { ...validated }
      })
    } catch (err) {
      PrismaErrors.parseError(err)
      CreditsValidation.parseError(err)
    }
  }

  static async assignCreditsToEmployee(
    walletId: string,
    userId: string,
    ammount: AddCreditsInput['ammount']
  ): Promise<CreditsAssignedResponse | undefined> {
    try {
      const validated = CreditsValidation.validateAssignInput(
        walletId,
        userId,
        ammount
      )
      const assignation = await this._client.creditAssign.create({
        data: { ...validated },
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
      CreditsValidation.parseError(err)
    }
  }
}
