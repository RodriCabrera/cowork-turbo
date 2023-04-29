import { Login } from '@/components/Login'

export const UserLoginPage = () => {
  return (
    <div className="flex h-[calc(100vh-64px)] w-screen items-center justify-center bg-gray-50">
      <Login endpoint="login" />
    </div>
  )
}

export default UserLoginPage
