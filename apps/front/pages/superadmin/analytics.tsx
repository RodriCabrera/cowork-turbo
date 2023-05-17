import { ReactElement } from 'react'

import { SuperadminLayout } from '@/common/components/Layout/SuperadminLayout'
import { getSuperAdminData } from '@/common/utils/getSuperAdminData'
import { PropsWithSuperadmin } from '@/common/types'

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
