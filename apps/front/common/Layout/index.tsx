import { PropsWithChildren } from 'react'

import { NavBar } from './NavBar'
import { Footer } from './Footer'
import { raleway } from '@/common/styles/fonts'

export const BaseLayout = ({ children }: PropsWithChildren) => (
  <div className={`${raleway.className} h-full min-h-screen pb-16`} id="layout">
    <NavBar />
    {children}
    <Footer />
  </div>
)
