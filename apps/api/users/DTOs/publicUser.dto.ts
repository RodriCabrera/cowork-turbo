import { User } from '@prisma/client'
import { PublicUser } from '../userTypes'

export default class PublicUserDTO implements PublicUser {
  id: PublicUser['id']
  firstName: PublicUser['firstName']
  lastName: PublicUser['lastName']
  email: PublicUser['email']
  role: PublicUser['role']
  companyId: PublicUser['companyId']
  isActive: PublicUser['isActive']
  constructor(userData: User) {
    this.companyId = userData.companyId
    this.email = userData.email
    this.firstName = userData.firstName
    this.lastName = userData.lastName
    this.id = userData.id
    this.role = userData.role
    this.isActive = userData.isActive
  }
}
