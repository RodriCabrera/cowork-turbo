/* eslint-disable no-unused-vars */
import { SuperAdminData, AdminData } from 'types'
import { Auth } from './modules/auth/types'

declare module 'iron-session' {
  interface IronSessionData {
    superadmin?: SuperAdminData & Auth
    admin?: AdminData & Auth
  }
}
