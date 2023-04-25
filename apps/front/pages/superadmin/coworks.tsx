import { ReactElement } from 'react'

import { SuperadminLayout } from '@/components/superadmin/SuperadminLayout'
import { PropsWithUser } from 'types'
import { protectSuperadminRoute } from '@/lib/protectSuperadminRoute'

export const CoworksManagement = ({ user }: PropsWithUser) => {
  return (
    <SuperadminLayout user={user}>
      <main>
        <h1 className="m-8 text-start text-6xl font-bold">COWORKS</h1>
      </main>
    </SuperadminLayout>
  )
}

export const getServerSideProps = protectSuperadminRoute

CoworksManagement.getLayout = function getLayout(page: ReactElement) {
  return page
}

export default CoworksManagement
