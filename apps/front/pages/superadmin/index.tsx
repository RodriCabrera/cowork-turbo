import React, { ReactElement } from 'react'

import { SuperadminLayout } from '@/components/superadmin/SuperadminLayout'
import { Login } from '../../components/Login'

export const SuperadminLoginPage = () => <Login endpoint="superadmins/login" />

SuperadminLoginPage.getLayout = function getLayout(page: ReactElement) {
  return <SuperadminLayout>{page}</SuperadminLayout>
}

export default SuperadminLoginPage
