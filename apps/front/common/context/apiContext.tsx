import { PropsWithChildren, createContext, useContext } from 'react'
import Axios from '@/common/utils/axios'
import { AxiosInstance } from 'axios'

export const ApiContext = createContext<null | any>(null)

export function ApiProvider({
  children,
  token
}: PropsWithChildren<{ token: string | undefined }>) {
  const api = Axios.getInstance(token)

  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>
}

export const useApi = () => {
  const api: AxiosInstance = useContext(ApiContext)
  return api
}
