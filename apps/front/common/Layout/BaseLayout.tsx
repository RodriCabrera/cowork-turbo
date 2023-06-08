import { PropsWithChildren } from 'react'

import { NavBar } from './NavBar'
import { Footer } from './Footer'
import { raleway } from '@/common/styles/fonts'
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
      {children}
      <Footer />
    </div>
  )
}
