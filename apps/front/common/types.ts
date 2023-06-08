import { UserJWT, SuperAdminData } from 'types'
import { Auth } from '../modules/auth/types'

export type PropsWithSuperadmin<P = unknown> = P & {
  superadmin?: (SuperAdminData & Auth) | undefined
}

export type UserProp = (Exclude<UserJWT, 'token'> & Auth) | null

export type PropsWithUser<P = unknown> = P & { user: UserProp | null }
