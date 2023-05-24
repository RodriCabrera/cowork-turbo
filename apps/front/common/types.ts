import { AdminData, SuperAdminData } from 'types'
import { Auth } from '../modules/auth/types'

export type PropsWithSuperadmin<P = unknown> = P & {
  superadmin?: (SuperAdminData & Auth) | undefined
}

export type AdminProp = (AdminData & Auth) | undefined

export type PropsWithAdmin<P = unknown> = P & { admin: AdminProp | undefined }
