import { ReactElement } from 'react'

import { SuperadminLayout } from '@/components/superadmin/SuperadminLayout'
import { PropsWithUser } from 'types'
import { protectSuperadminRoute } from '@/lib/protectSuperadminRoute'

export const Analytics = ({ user }: PropsWithUser) => {
  return (
    <SuperadminLayout user={user}>
      <main>
        <h1 className="text-start text-6xl font-bold">ANALYTICS</h1>
      </main>
    </SuperadminLayout>
  )
}

export const getServerSideProps = protectSuperadminRoute

Analytics.getLayout = function getLayout(page: ReactElement) {
  return page
}

export default Analytics
