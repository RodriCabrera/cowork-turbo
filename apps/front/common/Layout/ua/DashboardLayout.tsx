import { PropsWithChildren } from 'react'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'

export const DashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex h-screen w-screen flex-col md:flex-row">
      <Sidebar>
        <Topbar className="flex md:hidden" />
      </Sidebar>
      <section className="w-[calc(100vw-136px)] p-8">
        <Topbar className="hidden md:flex" />
        {children}
      </section>
    </div>
  )
}
