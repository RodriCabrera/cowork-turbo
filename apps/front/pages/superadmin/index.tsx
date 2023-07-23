import { SuperadminLayout } from '@/common/Layout/SuperadminLayout'
import { LoginForm } from '../../modules/auth/components/LoginForm'

export const SuperadminLoginPage = () => (
  <SuperadminLayout>
    <LoginForm endpoint="superadmins/login" />
  </SuperadminLayout>
)

export default SuperadminLoginPage
