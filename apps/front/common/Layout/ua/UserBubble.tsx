import { Fragment } from 'react'
import Link from 'next/link'
import { Menu, Transition } from '@headlessui/react'

import { joinClassNames } from '@/common/utils/joinClassNames'
import { bungeeHairline } from '@/common/styles/fonts'

interface UserBarProps {
  className?: string
  nameInitial: string | undefined
}

export const UserBubble = ({ className, nameInitial }: UserBarProps) => (
  <nav className={`flex w-full max-w-5xl justify-end ${className}`}>
    <div className="absolute  right-0 flex items-center pr-2 sm:static sm:inset-auto">
      {/* Profile dropdown */}
      <Menu as="div" className="relative">
        <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          <span className="sr-only">Open user menu</span>
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full bg-green-300 text-2xl ${bungeeHairline.className}`}
          >
            {nameInitial}
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
                  href="/api/logout"
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
  </nav>
)
