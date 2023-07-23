import UserValidate from './userValidation'
import { User } from '@prisma/client'

const createAdminSchema = UserValidate.getCreateAdminSchema()

export type CreateAdminInput = ReturnType<typeof createAdminSchema.parse>
export type PublicUser = {
  id: User['id']
  firstName: User['firstName']
  lastName: User['lastName']
  email: User['email']
  role: User['role']
  companyId: User['companyId']
  isActive: User['isActive']
}
