import Axios from '@/common/utils/axios'

export const getCoworks = async ({
  pageIndex,
  pageSize,
  cursor
}: {
  pageIndex?: string
  pageSize?: string
  cursor?: string
}) => {
  const api = Axios.getInstance()
  const url = new URL('/coworks', process.env.NEXT_PUBLIC_API_URL)
  if (pageSize) url.searchParams.append('count', pageSize)
  if (pageIndex) url.searchParams.append('page', pageIndex)
  if (cursor) url.searchParams.append('cursor', cursor)
  return await api.get(url.href)
}
