/* eslint-disable no-unused-vars */
import { SuperAdminData } from 'types'

declare module 'iron-session' {
  interface IronSessionData {
    superadmin?: SuperAdminData
  }
}
