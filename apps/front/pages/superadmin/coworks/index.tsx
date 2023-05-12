import { ReactElement } from 'react'
import Link from 'next/link'

import { SuperadminLayout } from '@/components/superadmin/SuperadminLayout'
import { CoworksTable } from '@/components/superadmin/CoworksTable'
import { PropsWithSuperadmin } from '@/types/superadmin'
import { getSuperAdminData } from '@/lib/superadmin'

export const CoworksManagementPage = ({ superadmin }: PropsWithSuperadmin) => {
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
        <CoworksTable />
      </main>
    </SuperadminLayout>
  )
}

export const getServerSideProps = getSuperAdminData

CoworksManagementPage.getLayout = (page: ReactElement) => page

export default CoworksManagementPage
