import Axios from '@/common/api/axios'

import { CoworkFullGetRes } from 'types'
import { ROUTES } from '@/common/routes'

const api = Axios.getInstance()

const { COWORKS_PATH } = ROUTES

// TODO: Check if there's a way to pass pageSize from infinite query
export const getCoworks = async ({
  pageIndex,
  pageSize = '3',
  pageParam
}: {
  pageIndex?: string
  pageSize?: string
  pageParam?: string
}): Promise<CoworkFullGetRes> => {
  const url = new URL(`${COWORKS_PATH}`, process.env.NEXT_PUBLIC_API_URL)
  if (pageSize) url.searchParams.append('count', pageSize)
  if (pageIndex) url.searchParams.append('page', pageIndex)
  if (pageParam) url.searchParams.append('cursor', pageParam)
  return await api.get(url.href).then((res) => res.data)
}

export const getCoworkDetails = async (coworkId: string | undefined) =>
  await api.get(`${COWORKS_PATH}/${coworkId}`)
