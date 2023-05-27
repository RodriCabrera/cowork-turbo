import { PropsWithChildren } from 'react'
import { Sidebar } from './Sidebar'
import { UserBar } from './UserBar'

export const DashboardLayout = ({
  children,
  nameInitial
}: PropsWithChildren<{ nameInitial: string | undefined }>) => {
  return (
    <div className="flex h-screen w-screen flex-col md:flex-row">
      <Sidebar>
        <UserBar className="flex md:hidden" nameInitial={nameInitial} />
      </Sidebar>
      <section className="p-8 md:w-[calc(100vw-136px)]">
        <UserBar className="hidden md:flex" nameInitial={nameInitial} />
        {children}
      </section>
    </div>
  )
}
