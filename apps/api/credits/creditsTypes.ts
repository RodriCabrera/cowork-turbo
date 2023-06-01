import { Wallet } from '@prisma/client'
import { PublicUser } from '../users/userTypes'

export type AddCreditsInput = {
  companyId: Wallet['companyId']
  ammount: Wallet['credits']
}

export type CreditsAssignedResponse = {
  employee: PublicUser
  credits: number | null
}
