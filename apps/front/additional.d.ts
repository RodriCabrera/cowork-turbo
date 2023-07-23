/* eslint-disable no-unused-vars */
import { SuperAdminData, AdminData, UserJWT } from 'types'
import { Auth } from './modules/auth/types'

declare module 'iron-session' {
  interface IronSessionData {
    superadmin?: SuperAdminData & Auth
    user?: Exclude<UserJWT, 'token'> & Auth
  }
}
