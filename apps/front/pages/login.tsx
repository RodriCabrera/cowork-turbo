import { BaseLayout } from '@/common/Layout/BaseLayout'
import { PropsWithUser } from '@/common/types'
import { getUserSession } from '@/common/utils/getAdminSession'
import { LoginForm } from '@/modules/auth/components/LoginForm'
import Image from 'next/image'

export const UserLoginPage = ({ user }: PropsWithUser) => {
  return (
    <BaseLayout user={user}>
      <div className="flex min-h-[calc(100vh-8.1rem)] w-screen flex-col items-center justify-center gap-2  md:gap-8">
        <div className="flex flex-col gap-2 md:flex-row md:gap-8">
          <Image
            alt="illustration"
            src="/fridge.gif"
            className=" h-96 object-cover brightness-110 grayscale"
            width={400}
            height={400}
          />

          <div>
            <div className="flex flex-col gap-2 p-8">
              <p className="text-left text-2xl">
                Just 3 steps to <b>login:</b>
              </p>

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
        </div>
      </div>
    </BaseLayout>
  )
}

export const getServerSideProps = getUserSession

export default UserLoginPage
