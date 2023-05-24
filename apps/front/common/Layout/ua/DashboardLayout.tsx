import { PropsWithChildren } from 'react'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'

export const DashboardLayout = ({
  children,
  nameInitial
}: PropsWithChildren<{ nameInitial: string | undefined }>) => {
  return (
    <div className="flex h-screen w-screen flex-col md:flex-row">
      <Sidebar>
        <TopBar className="flex md:hidden" nameInitial={nameInitial} />
      </Sidebar>
      <section className="p-8 md:w-[calc(100vw-136px)]">
        <TopBar className="hidden md:flex" nameInitial={nameInitial} />
        {children}
      </section>
    </div>
  )
}
