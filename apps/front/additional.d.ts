/* eslint-disable no-unused-vars */
import { SuperAdminData } from 'types'

declare module 'iron-session' {
  interface IronSessionData {
    access_token?: string
    superadmin?: SuperAdminData
  }
}
