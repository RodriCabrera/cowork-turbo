import { PropsWithChildren, createContext } from 'react'
import Axios from '@/common/api/axios'

export const ApiContext = createContext<null | any>(null)

export function ApiProvider({
  children,
  token
}: PropsWithChildren<{ token: string | undefined }>) {
  const api = Axios.getInstance(token)

  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>
}

// export const useApi = () => {
//   const api: AxiosInstance = useContext(ApiContext)
//   // TODO: Check this error. It's to prevent getting undefined 'api'
//   if (!api) throw new Error('useApi should be used within a ApiProvider child')
//   return api
// }
