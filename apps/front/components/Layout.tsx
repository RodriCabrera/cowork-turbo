import { PropsWithChildren } from 'react'
import { NavBar } from './NavBar'

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <NavBar />
      <main>{children}</main>
    </>
  )
}
