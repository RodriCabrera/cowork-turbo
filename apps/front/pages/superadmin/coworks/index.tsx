import { ReactElement } from 'react'
import Link from 'next/link'
import { useQuery } from 'react-query'

import { CoworkFullGetRes } from 'types'

import { SuperadminLayout } from '@/components/superadmin/SuperadminLayout'
import { CoworksTable } from '@/components/superadmin/CoworksTable'
import { withSessionSsr } from '@/lib/withSession'
import { PropsWithSuperadmin } from '@/types/superadmin'
import { ApiProvider } from '@/context/apiContext'

export const CoworksManagementPage = ({ superadmin }: PropsWithSuperadmin) => {
  const getCoworks = async () => {
    const coworksRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/coworks`)
    return await coworksRes.json()
  }

  const { isLoading, data: coworks } = useQuery<CoworkFullGetRes[]>({
    queryKey: 'coworks',
    queryFn: getCoworks
  })

  return (
    <SuperadminLayout superadmin={superadmin}>
      <ApiProvider token={superadmin?.access_token}>
        <main>
          <h1 className="text-start text-6xl font-bold">COWORKS</h1>
          <div className="flex justify-end">
            <Link
              href={'/superadmin/coworks/new'}
              className="rounded-md border-2 bg-gray-100 px-3 py-2 text-sm font-medium"
            >
              Add Cowork
            </Link>
          </div>
          <CoworksTable coworks={coworks || []} isLoading={isLoading} />
        </main>
      </ApiProvider>
    </SuperadminLayout>
  )
}

export const getServerSideProps = withSessionSsr(async ({ req }) => {
  const { superadmin } = req.session
  return {
    props: { superadmin }
  }
})

CoworksManagementPage.getLayout = (page: ReactElement) => page

export default CoworksManagementPage
