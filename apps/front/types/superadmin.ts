import { SuperAdminData } from 'types'
import { Auth } from './auth'

export type PropsWithSuperadmin<P = unknown> = P & {
  superadmin?: (SuperAdminData & Auth) | undefined
}
