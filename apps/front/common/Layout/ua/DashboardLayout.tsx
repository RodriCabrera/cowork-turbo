import { PropsWithChildren } from 'react'
import { Sidebar } from './Sidebar'
import { UserBubble } from './UserBubble'

export const DashboardLayout = ({
  children,
  nameInitial
}: PropsWithChildren<{ nameInitial: string | undefined }>) => (
  <div className="flex h-screen w-screen flex-col md:flex-row">
    <Sidebar>
      <UserBubble className="flex md:hidden" nameInitial={nameInitial} />
    </Sidebar>
    <section className="p-8 md:w-[calc(100vw-136px)]">
      <UserBubble className="hidden md:flex" nameInitial={nameInitial} />
      {children}
    </section>
  </div>
)
