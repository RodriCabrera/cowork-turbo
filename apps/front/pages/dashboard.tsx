import { NextPage } from 'next'
import { Tab } from '@headlessui/react'
import Axios from '@/common/utils/axios'
import { AxiosResponse } from 'axios'
import { useQuery } from 'react-query'

import { CompanyGetOneRes } from 'types'

import { bungee } from '@/common/styles/fonts'
import { PropsWithAdmin } from '@/common/types'
import { DashboardLayout } from '@/common/Layout/ua/DashboardLayout'
import { joinClassNames } from '@/common/utils/joinClassNames'
import { PeopleList } from '@/modules/dashboard/components/PeopleList'
import { getCompany } from '@/modules/dashboard/endpoints'
import { getAdminSession } from '@/common/utils/getAdminSession'

export const AdminDashboardPage = ({ admin }: PropsWithAdmin) => {
  const api = Axios.getInstance(admin?.access_token) // TODO: Use api provider?

  const { isLoading: isPeopleLoading, data: peopleData } = useQuery<
    AxiosResponse<CompanyGetOneRes>
  >({
    queryKey: ['company', { companyId: admin?.companyId }],
    queryFn: () => getCompany(api, admin?.companyId),
    refetchOnWindowFocus: false
  })

  const tabs = {
    People: (
      <PeopleList
        employees={peopleData?.data.employees}
        isLoading={isPeopleLoading}
      />
    ),
    Credits: <div>Credits Component</div>
  }

  return (
    <DashboardLayout>
      <p className={`p-6 text-3xl ${bungee.className}`}>Dashboard</p>
      <div className="w-full max-w-md px-2 py-16 sm:px-0">
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl p-1">
            {Object.keys(tabs).map((tabName) => (
              <Tab
                key={tabName}
                className={({ selected }) =>
                  joinClassNames(
                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5 ',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-slate-400 focus:outline-none focus:ring-2',
                    selected
                      ? 'bg-white shadow'
                      : 'hover:text-slate text-stone-300 hover:bg-stone-100'
                  )
                }
              >
                {tabName}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-2">
            {Object.values(tabs).map((tabComponent, idx) => (
              <Tab.Panel
                key={idx}
                className={joinClassNames(
                  'rounded-xl bg-white p-3',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                )}
              >
                {tabComponent}
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </DashboardLayout>
  )
}

export const getServerSideProps = getAdminSession

AdminDashboardPage.getLayout = (page: NextPage) => page

export default AdminDashboardPage
