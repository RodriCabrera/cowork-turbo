import { Fragment } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BiMenu } from 'react-icons/bi'
import { RiCloseLine } from 'react-icons/ri'
import { FiUser } from 'react-icons/fi'

import { bungeeOutline } from '@/common/styles/fonts'
import { PropsWithSuperadmin } from '@/common/types'
import { joinClassNames } from '../../utils/joinClassNames'
import { ROUTES } from '../../routes'
import { COWORKS } from '@/modules/coworks/constants'

export const SuperadminNavbar = ({ superadmin }: PropsWithSuperadmin) => {
  const router = useRouter()

  const isCurrentPage = (page: string) => router.pathname.includes(page)

  const { SUPERADMIN_COWORKS_PATH } = ROUTES

  const navigation = [
    {
      name: 'Coworks',
      href: SUPERADMIN_COWORKS_PATH,
      current: isCurrentPage(COWORKS)
    },
    {
      name: 'User Management',
      href: 'user-management',
      current: isCurrentPage('user-management')
    },
    {
      name: 'Analytics',
      href: 'analytics',
      current: isCurrentPage('analytics')
    }
  ]

  return (
    <Disclosure as="nav" className="border-b-2 bg-white">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                {superadmin && (
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <RiCloseLine
                        className="block h-6 w-6"
                        aria-hidden="true"
                      />
                    ) : (
                      <BiMenu className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                )}
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex shrink-0 items-center">
                  <Link href={SUPERADMIN_COWORKS_PATH}>
                    <header
                      className={`${bungeeOutline.className} w-1/3 text-2xl sm:text-3xl `}
                    >
                      BaseBloom
                    </header>
                  </Link>
                </div>
                {superadmin && (
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={joinClassNames(
                            item.current ? 'bg-gray-100 ' : 'text-gray-500',
                            'rounded-md px-3 py-2 text-sm font-medium'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {superadmin && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-300">
                        <FiUser className="h-6 w-6 text-emerald-400 " />
                      </div>
                    </Menu.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-gray-200 ring-offset-2 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/api/superadmin/logout"
                              className={joinClassNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              Logout
                            </Link>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              )}
            </div>
          </div>

          {superadmin && (
            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={joinClassNames(
                      item.current ? 'bg-gray-100 ' : 'text-gray-500',
                      'block rounded-md px-3 py-2 text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          )}
        </>
      )}
    </Disclosure>
  )
}
