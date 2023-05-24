import Link from 'next/link'

import { SuperadminLayout } from '@/common/Layout/SuperadminLayout'
import { CoworksTable } from '@/modules/coworks/components/CoworksTable'
import { PropsWithSuperadmin } from '@/common/types'
import { getSuperAdminData } from '@/common/utils/getSuperAdminData'

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

export default CoworksManagementPage
