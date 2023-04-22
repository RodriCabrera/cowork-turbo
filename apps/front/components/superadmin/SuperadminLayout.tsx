import { ReactNode } from 'react'
import { SuperadminNavbar } from './SuperadminNavbar'

export const SuperadminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <SuperadminNavbar />
      {children}
    </>
  )
}
