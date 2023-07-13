import { useContext } from 'react'
import { AxiosInstance } from 'axios'

import { ApiContext } from '../api/context/apiContext'

export const useApi = () => {
  const api: AxiosInstance = useContext(ApiContext)
  // TODO: Check this error. It's to prevent getting undefined 'api'
  if (!api) throw new Error('useApi should be used within a ApiProvider child')
  return api
}
