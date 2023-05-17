import { LoginForm } from '@/modules/auth/components/LoginForm'

export const UserLoginPage = () => {
  return (
    <div className="flex h-[calc(100vh-64px)] w-screen items-center justify-center bg-gray-50">
      <LoginForm endpoint="login" />
    </div>
  )
}

export default UserLoginPage
