import { ReactElement } from 'react'

import { SuperadminLayout } from '@/common/Layout/SuperadminLayout'
import { LoginForm } from '../../modules/auth/components/LoginForm'

export const SuperadminLoginPage = () => (
  <LoginForm endpoint="superadmins/login" />
)

SuperadminLoginPage.getLayout = (page: ReactElement) => (
  <SuperadminLayout>{page}</SuperadminLayout>
)

export default SuperadminLoginPage
