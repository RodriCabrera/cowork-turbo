import Axios from '@/lib/axios'
import { PropsWithChildren, createContext, useContext } from 'react'

export const ApiContext = createContext<null | any>(null)

export function ApiProvider({
  children,
  token
}: PropsWithChildren<{ token: string | undefined }>) {
  const api = Axios.getInstance(token)

  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>
}

export const useApi = () => {
  const api = useContext(ApiContext)
  return api
}