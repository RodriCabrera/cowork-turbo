import { PropsWithChildren } from 'react'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'

export const DashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex h-screen w-screen flex-col md:flex-row">
      <Sidebar>
        <Topbar className="flex md:hidden" />
      </Sidebar>
      <section className="p-8 md:w-[calc(100vw-136px)]">
        <Topbar className="hidden md:flex" />
        {children}
      </section>
    </div>
  )
}
