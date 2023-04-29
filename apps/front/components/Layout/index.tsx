import { PropsWithChildren } from 'react'
import { NavBar } from './NavBar'
import { Footer } from './Footer'
import { raleway } from '@/styles/fonts'

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className={`${raleway.className}`}>
      <NavBar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
