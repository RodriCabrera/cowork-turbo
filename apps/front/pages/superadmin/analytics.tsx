import { ReactElement } from 'react'

import { SuperadminLayout } from '@/components/superadmin/SuperadminLayout'
import { PropsWithUser } from 'types'
import { protectSuperadminRoute } from '@/lib/protectSuperadminRoute'

export const AnalyticsPage = ({ user }: PropsWithUser) => {
  return (
    <SuperadminLayout user={user}>
      <main>
        <h1 className="text-start text-6xl font-bold">ANALYTICSPage</h1>
      </main>
    </SuperadminLayout>
  )
}

export const getServerSideProps = protectSuperadminRoute

AnalyticsPage.getLayout = function getLayout(page: ReactElement) {
  return page
}

export default AnalyticsPage
