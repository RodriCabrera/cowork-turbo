import { SuperAdminData } from 'types'

export type PropsWithSuperadmin<P = unknown> = P & {
  superadmin?: SuperAdminData | undefined
}
