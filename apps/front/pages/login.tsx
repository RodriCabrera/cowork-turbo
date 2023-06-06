import { BaseLayout } from '@/common/Layout/BaseLayout'
import { PropsWithAdmin } from '@/common/types'
import { getUserSession } from '@/common/utils/getAdminSession'
import { LoginForm } from '@/modules/auth/components/LoginForm'

export const UserLoginPage = ({ admin }: PropsWithAdmin) => {
  return (
    <BaseLayout admin={admin}>
      <div className="flex h-[calc(100vh-8.1rem)] w-screen flex-col items-center justify-center gap-2 bg-gray-50 md:gap-8">
        <div className="flex flex-col gap-2 p-8">
          <p className="text-left text-2xl">Just 3 steps to login:</p>

          <p className="text-left">
            1. Enter your email in the following form.
          </p>
          <p className="text-left">
            2. You will receive an email with a button to confirm the login.
          </p>
          <p className="">3. Click the button.</p>
        </div>
        <LoginForm endpoint="users/login" />
      </div>
    </BaseLayout>
  )
}

export const getServerSideProps = getUserSession

export default UserLoginPage
