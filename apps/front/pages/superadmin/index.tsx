import { ReactElement } from 'react'

import { SuperadminLayout } from '@/components/superadmin/SuperadminLayout'
import { LoginForm } from '../../components/LoginForm'

export const SuperadminLoginPage = () => (
  <LoginForm endpoint="superadmins/login" />
)

SuperadminLoginPage.getLayout = (page: ReactElement) => (
  <SuperadminLayout>{page}</SuperadminLayout>
)

export default SuperadminLoginPage
