export interface UserData {
  id: string
  name: string
  mail: string
  token: string
  iat: string
}

export type PropsWithUser<P = unknown> = P & { user: UserData | undefined }
