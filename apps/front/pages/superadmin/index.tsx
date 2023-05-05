import { ReactElement } from 'react'

import { SuperadminLayout } from '@/components/superadmin/SuperadminLayout'
import { Login } from '../../components/Login'

export const SuperadminLoginPage = () => <Login endpoint="superadmins/login" />

SuperadminLoginPage.getLayout = (page: ReactElement) => (
  <SuperadminLayout>{page}</SuperadminLayout>
)

export default SuperadminLoginPage
