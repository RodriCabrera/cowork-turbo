import { PropsWithChildren } from 'react'

import { raleway } from '@/common/styles/fonts'
import { ApiProvider } from '../api/context/apiContext'
import { NavBar } from './NavBar'
import { Footer } from './Footer'
import { UserProp } from '../types'

export const BaseLayout = ({
  user,
  children
}: PropsWithChildren<{ user: UserProp }>) => {
  return (
    <div
      className={`${raleway.className} h-full min-h-screen pb-16`}
      id="layout"
    >
      <NavBar user={user} />
      <ApiProvider token={user?.access_token}>{children}</ApiProvider>
      <Footer />
    </div>
  )
}
