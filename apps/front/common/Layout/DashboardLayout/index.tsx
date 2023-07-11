import { PropsWithChildren } from 'react'

import { Sidebar } from './Sidebar'
import { DashboardNavbar } from './DashboardNavbar'
import { ApiProvider } from '@/common/api/context/apiContext'
import { NavigationTabs } from '@/modules/dashboard/components/NavigationTabs'

export const DashboardLayout = ({
  children,
  nameInitial,
  token
}: PropsWithChildren<{
  nameInitial: string | undefined
  token: string | undefined
}>) => (
  <div className="flex h-screen w-screen flex-col md:flex-row">
    <Sidebar>
      <DashboardNavbar
        containerClassName="flex md:hidden"
        nameInitial={nameInitial}
      />
    </Sidebar>

    <section className="p-8 md:w-[calc(100vw-136px)]">
      <nav className={'flex w-full max-w-5xl justify-end'}>
        <DashboardNavbar
          containerClassName="hidden md:flex"
          nameInitial={nameInitial}
        />
      </nav>
      <ApiProvider token={token}>
        <NavigationTabs />
        {children}
      </ApiProvider>
    </section>
  </div>
)
