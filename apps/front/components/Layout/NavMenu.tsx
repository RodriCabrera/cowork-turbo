import { Menu } from '@headlessui/react'
import Link from 'next/link'
import { FiMenu } from 'react-icons/fi'

const dropdownOptions = [
  {
    name: 'Sing up as a company',
    href: '/register?role=company',
    current: false
  },
  {
    name: 'Sign up as a freelancer',
    href: '/register?role=freelancer',
    current: false
  },
  { name: 'Log in', href: '/login', current: false }
]

export const NavMenu = () => (
  <Menu as="div" className="px-1">
    <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
      <span className="sr-only">Open user menu</span>
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
        <FiMenu className="h-6 w-6 text-gray-400 " />
      </div>
    </Menu.Button>
    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-gray-200 focus:outline-none">
      {dropdownOptions.map((option, index) => (
        <Menu.Item key={index}>
          {({ active }) => (
            <Link
              href={option.href}
              className={`${
                active ? 'bg-gray-100' : ''
              } block px-4 py-2 text-sm text-gray-700`}
            >
              {option.name}
            </Link>
          )}
        </Menu.Item>
      ))}
    </Menu.Items>
  </Menu>
)
