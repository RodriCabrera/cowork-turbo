import { AxiosInstance } from 'axios'

import Axios from '@/common/api/axios'
import { CoworkFullGetRes } from 'types'
import { ROUTES } from '@/common/routes'

const api = Axios.getInstance()

const { COWORKS_PATH } = ROUTES

// TODO: COMPARE fetchCoworks with getCoworks.
// One uses cursos, the other does not.
// Could we keep only 1 and use it in both cases?
export const fetchCoworks = ({ pageParam = '', pageSize = 3 }) => {
  return api<CoworkFullGetRes>(
    `${COWORKS_PATH}?count=${pageSize}&cursor=${pageParam}`
  ).then((res) => res.data)
}

export const getCoworks = async ({
  pageIndex,
  pageSize,
  cursor
}: {
  pageIndex?: string
  pageSize?: string
  cursor?: string
}) => {
  const url = new URL(`${COWORKS_PATH}`, process.env.NEXT_PUBLIC_API_URL)
  if (pageSize) url.searchParams.append('count', pageSize)
  if (pageIndex) url.searchParams.append('page', pageIndex)
  if (cursor) url.searchParams.append('cursor', cursor)
  return await api.get(url.href)
}

// TODO: Do we need to pass the api as param or can we declare it in this file?
export const getCoworkDetails = async (
  api: AxiosInstance,
  coworkId: string | undefined
) => {
  return await api.get(`${COWORKS_PATH}/${coworkId}`)
}
