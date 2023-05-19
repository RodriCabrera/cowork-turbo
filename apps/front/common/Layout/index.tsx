import { PropsWithChildren } from 'react'

import { NavBar } from './NavBar'
import { Footer } from './Footer'
import { raleway } from '@/common/styles/fonts'

export const BaseLayout = ({ children }: PropsWithChildren) => (
  <div className={`${raleway.className} min-h-screen `}>
    <NavBar />
    <main>{children}</main>
    <Footer />
  </div>
)