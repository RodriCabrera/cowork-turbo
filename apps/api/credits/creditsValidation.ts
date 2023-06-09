import { z } from 'zod'
import BasicValidator from '../utils/basicValidator'

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
}
