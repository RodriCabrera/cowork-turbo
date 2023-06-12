import { Tab } from '@headlessui/react'
import { useRouter } from 'next/router'

import { DASHBOARD_TABS } from '@/common/constants'
import { joinClassNames } from '@/common/utils/joinClassNames'
import { bungee } from '@/common/styles/fonts'

export const NavigationTabs = () => {
  const router = useRouter()
  const currentTab = DASHBOARD_TABS.find(({ href }) => href === router.pathname)

  return (
    <div className="flex w-full max-w-5xl flex-col gap-6 pb-8 sm:px-0">
      <p className={`pt-6 text-3xl ${bungee.className}`}>Dashboard</p>
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl">
          {DASHBOARD_TABS.map(({ title, icon, href }) => (
            <Tab
              key={title}
              onClick={() => router.push(href)}
              className={() =>
                joinClassNames(
                  'flex h-20 w-20 flex-col items-center justify-center rounded-lg py-2.5 text-sm font-semibold leading-5',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-slate-400 focus:outline-none focus:ring-2',
                  currentTab?.href === href
                    ? ' bg-emerald-100 text-emerald-900 shadow'
                    : 'hover:text-slate bg-stone-50 text-stone-300 hover:bg-stone-100 hover:text-gray-400'
                )
              }
            >
              <div className="text-2xl">{icon}</div>
              {title}
            </Tab>
          ))}
        </Tab.List>
      </Tab.Group>
    </div>
  )
}
