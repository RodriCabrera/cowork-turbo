import { ReactElement } from 'react'
import Link from 'next/link'

import { Coworks, PropsWithSuperadmin } from 'types'

import { SuperadminLayout } from '@/components/superadmin/SuperadminLayout'
import { CoworksTable } from '@/components/superadmin/CoworksTable'
import { withSessionSsr } from '@/lib/withSession'

export const CoworksManagementPage = ({
  superadmin,
  coworks
}: PropsWithSuperadmin<{ coworks: Coworks }>) => {
  return (
    <SuperadminLayout superadmin={superadmin}>
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
        <CoworksTable coworks={coworks} />
      </main>
    </SuperadminLayout>
  )
}

export const getServerSideProps = withSessionSsr(async ({ req }) => {
  // The superadmin comes from the iron session
  const { superadmin } = req.session
  // Fetch the coworks:
  const coworksRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/coworks`)
  const coworks = await coworksRes.json()

  return {
    props: { superadmin, coworks }
  }
})

CoworksManagementPage.getLayout = function getLayout(page: ReactElement) {
  return page
}

export default CoworksManagementPage
