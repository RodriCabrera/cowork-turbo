import { ReactElement } from 'react'

import { SuperadminLayout } from '@/components/superadmin/SuperadminLayout'
import { getSuperAdminData } from '@/lib/superadmin'
import { PropsWithSuperadmin } from '@/types/superadmin'

export const AnalyticsPage = ({ superadmin }: PropsWithSuperadmin) => {
  return (
    <SuperadminLayout superadmin={superadmin}>
      <main>
        <h1 className="text-start text-6xl font-bold">ANALYTICSPage</h1>
      </main>
    </SuperadminLayout>
  )
}

export const getServerSideProps = getSuperAdminData

AnalyticsPage.getLayout = (page: ReactElement) => page

export default AnalyticsPage
