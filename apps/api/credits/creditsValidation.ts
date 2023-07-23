import { z } from 'zod'
import BasicValidator from '../utils/basicValidator'
import { CreditAssign, Wallet } from '@prisma/client'
import CustomError, { ERROR_CODES } from '../errors/customError'

export default class CreditsValidation extends BasicValidator {
  private static $addAmount = z
    .number()
    .positive({ message: 'Credits must be greater than 0' })

  static validateAddInput(walletId: any, ammount: any) {
    return z
      .object({ walletId: this.$CUID, ammount: this.$addAmount })
      .parse({ walletId, ammount })
  }

  static validateAssignedGetInput(walletId: any, userId: any) {
    return z
      .object({ walletId: this.$CUID, userId: this.$CUID })
      .parse({ walletId, userId })
  }

  static validateAssignInput(walletId: any, userId: any, ammount: any) {
    return z
      .object({
        walletId: this.$CUID,
        userId: this.$CUID,
        ammount: this.$addAmount
      })
      .parse({ walletId, userId, ammount })
  }

  static checkFunds(
    wallet: Wallet & { CreditAssign: CreditAssign[] },
    ammount: number
  ) {
    if (wallet.credits < ammount) {
      throw new CustomError(
        'Insufficient credits',
        406,
        ERROR_CODES.InsufficientCredits
      )
    }
    // TODO: will this condition exist? Should it be customisable by wallet/by employee?
    const tempCondition = false
    if (tempCondition) {
      const assignedCredits = wallet.CreditAssign.reduce(
        (acc: number, assign: CreditAssign) => {
          return (acc += assign.ammount)
        },
        0
      )
      if (assignedCredits + ammount > wallet.credits) {
        throw new CustomError(
          'Insufficient credits',
          406,
          ERROR_CODES.InsufficientCredits
        )
      }
    }
  }
}
