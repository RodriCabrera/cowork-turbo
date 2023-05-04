/* eslint-disable no-unused-vars */
import { SuperAdminData } from 'types'
import { Auth } from './types/auth'

declare module 'iron-session' {
  interface IronSessionData {
    superadmin?: SuperAdminData & Auth
  }
}
