import { Fragment } from 'react'
import Link from 'next/link'
import { Menu, Transition } from '@headlessui/react'
import { FiUser } from 'react-icons/fi'

import { bungeeHairline } from '@/common/styles/fonts'
import { joinClassNames } from '../../utils/joinClassNames'
import { PropsWithUser } from '../../types'

export function BaseNavbar({ user }: PropsWithUser) {
  const isUserLogged = !!user && Object.keys(user).length !== 0
  const isAdmin = isUserLogged && user.role === 'ADMIN'

  const notLoggedOptions = [
    { name: 'Log in', href: '/login', current: false },
    {
      name: 'Sing up as a company',
      href: '/register?role=company',
      current: false
    },
    {
      name: 'Sign up as a freelancer',
      href: '/register?role=freelancer',
      current: false
    }
  ]

  const dropdownOptions = isUserLogged
    ? [{ name: 'Logout', href: '/api/logout', current: false }]
    : notLoggedOptions

  return (
    <nav className="border-b-2 bg-white">
      <div className="mx-auto max-w-7xl px-2 md:px-4">
        <div className="relative flex h-16 items-center justify-between">
          <div className="mr-2 flex items-center justify-center sm:items-stretch sm:justify-start">
            <header>
              <Link
                href="/"
                className={`${bungeeHairline.className} h-16 text-xl md:text-3xl`}
              >
                BaseBloom
              </Link>
            </header>
          </div>
          <div className="flex items-center gap-4">
            <Link
              className="cursor-pointer rounded-md bg-emerald-100 px-1 py-2 text-sm font-medium transition-all hover:bg-emerald-200 md:px-3"
              href="/coworks"
            >
              Coworks
            </Link>
            {isUserLogged && isAdmin && (
              <Link
                className="cursor-pointer rounded-md bg-gray-100 px-1 py-2 text-sm font-medium transition-all hover:bg-gray-200 md:px-3"
                href="/dashboard"
              >
                Dashboard
              </Link>
            )}
            {/* Profile dropdown */}
            <Menu as="div" className="px-1">
              <Menu.Button className="flex rounded-full bg-gray-800 text-sm  focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span className="sr-only">Open user menu</span>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 hover:bg-zinc-200">
                  <FiUser className="h-6 w-6 text-gray-400 hover:text-zinc-300" />
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
                <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-gray-200 focus:outline-none">
                  {dropdownOptions.map((option, index) => (
                    <Menu.Item key={index}>
                      {({ active }) => (
                        <Link
                          href={option.href}
                          className={joinClassNames(
                            active ? 'bg-gray-100' : '',
                            'block px-4 py-2 text-sm text-gray-700'
                          )}
                        >
                          {option.name}
                        </Link>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </div>
    </nav>
  )
}
