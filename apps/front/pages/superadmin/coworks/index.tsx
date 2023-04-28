import { ReactElement } from 'react'
import Link from 'next/link'

import { PropsWithUser } from 'types'

import { SuperadminLayout } from '@/components/superadmin/SuperadminLayout'
import { protectSuperadminRoute } from '@/lib/protectSuperadminRoute'
import { CoworksTable } from '@/components/superadmin/CoworksTable'

export const CoworksManagement = ({ user }: PropsWithUser) => {
  return (
    <SuperadminLayout user={user}>
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
        <CoworksTable />
      </main>
    </SuperadminLayout>
  )
}

export const getServerSideProps = protectSuperadminRoute

CoworksManagement.getLayout = function getLayout(page: ReactElement) {
  return page
}

export default CoworksManagement
