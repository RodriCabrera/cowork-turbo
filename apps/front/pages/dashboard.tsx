import { InferGetServerSidePropsType } from 'next'
import { Tab } from '@headlessui/react'
import Axios from '@/common/utils/axios'
import { AxiosResponse } from 'axios'
import { useQuery } from 'react-query'
import { HiOutlineUsers, HiOutlineCurrencyDollar } from 'react-icons/hi2'

import { CompanyGetOneRes } from 'types'

import { bungee } from '@/common/styles/fonts'
import { DashboardLayout } from '@/common/Layout/ua/DashboardLayout'
import { joinClassNames } from '@/common/utils/joinClassNames'
import { PeopleList } from '@/modules/dashboard/components/PeopleTable'
import { getCompany } from '@/modules/dashboard/endpoints'
import { getAdminSession } from '@/common/utils/getAdminSession'

export const AdminDashboardPage = ({
  admin
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const api = Axios.getInstance(admin?.access_token) // TODO: Use api provider?

  const { isLoading: isPeopleLoading, data: peopleData } = useQuery<
    AxiosResponse<CompanyGetOneRes>
  >({
    queryKey: ['company', { companyId: admin?.companyId }],
    queryFn: () => getCompany(api, admin?.companyId),
    refetchOnWindowFocus: false
  })

  const tabs: {
    [Key: string]: { component: JSX.Element; icon: JSX.Element }
  } = {
    People: {
      component: (
        <PeopleList
          employees={peopleData?.data.employees}
          isLoading={isPeopleLoading}
        />
      ),
      icon: <HiOutlineUsers />
    },
    Credits: {
      component: <div>a</div>,
      icon: <HiOutlineCurrencyDollar />
    }
  }

  return (
    <DashboardLayout
      nameInitial={admin?.firstName[0]}
      token={admin?.access_token}
    >
      <p className={`pt-6 text-3xl ${bungee.className}`}>Dashboard</p>
      <div className="w-full max-w-5xl py-8 sm:px-0">
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl">
            {Object.keys(tabs).map((tabName) => (
              <Tab
                key={tabName}
                className={({ selected }) =>
                  joinClassNames(
                    'flex h-20 w-20 flex-col items-center justify-center rounded-lg py-2.5 text-sm font-semibold leading-5',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-slate-400 focus:outline-none focus:ring-2',
                    selected
                      ? ' bg-emerald-100 text-emerald-900 shadow'
                      : 'hover:text-slate bg-stone-50 text-stone-300 hover:bg-stone-100 hover:text-gray-400'
                  )
                }
              >
                <div className="text-2xl">{tabs[tabName].icon}</div>
                {tabName}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-2">
            {Object.values(tabs).map((tab, idx) => (
              <Tab.Panel key={idx} className="rounded-xl py-3">
                {tab.component}
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </DashboardLayout>
  )
}

export const getServerSideProps = getAdminSession

export default AdminDashboardPage
