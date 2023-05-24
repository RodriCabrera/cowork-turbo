import { PropsWithChildren } from 'react'

import { NavBar } from './NavBar'
import { Footer } from './Footer'
import { raleway } from '@/common/styles/fonts'
import { PropsWithAdmin } from '../types'

export const BaseLayout = ({
  children,
  admin
}: PropsWithChildren<PropsWithAdmin>) => {
  return (
    <div
      className={`${raleway.className} h-full min-h-screen pb-16`}
      id="layout"
    >
      <NavBar admin={admin} />
      {children}
      <Footer />
    </div>
  )
}
