import { SuperAdminData } from 'types'
import { Auth } from '../modules/auth/types'

export type PropsWithSuperadmin<P = unknown> = P & {
  superadmin?: (SuperAdminData & Auth) | undefined
}
