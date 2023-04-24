import React, { ReactElement } from 'react'

import { SuperadminLayout } from '@/components/superadmin/SuperadminLayout'

export const SuperadminDashboard = () => <main>THE DASHBOARD</main>

SuperadminDashboard.getLayout = function getLayout(page: ReactElement) {
  return <SuperadminLayout>{page}</SuperadminLayout>
}

export default SuperadminDashboard
