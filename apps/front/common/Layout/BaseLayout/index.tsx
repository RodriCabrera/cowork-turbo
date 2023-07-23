import { PropsWithChildren } from 'react'

import { raleway } from '@/common/styles/fonts'
import { UserProp } from '@/common/types'
import { BaseNavbar } from './BaseNavbar'
import { ApiProvider } from '@/common/api/context/apiContext'
import { Footer } from './Footer'

export const BaseLayout = ({
  user,
  children
}: PropsWithChildren<{ user: UserProp }>) => {
  return (
    <div
      className={`${raleway.className} h-full min-h-screen pb-16`}
      id="layout"
    >
      <BaseNavbar user={user} />
      <ApiProvider token={user?.access_token}>{children}</ApiProvider>
      <Footer />
    </div>
  )
}
