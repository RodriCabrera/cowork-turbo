import { Fragment } from 'react'
import Link from 'next/link'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { bungee } from '@/styles/fonts'
import { Bars3Icon, UserIcon } from '@heroicons/react/24/solid'

const dropdownOptions = [
  { name: 'Registrate como empresa', href: '#', current: false },
  { name: 'Registrate como freelancer', href: '#', current: false },
  { name: 'Iniciar sesion', href: '#', current: false },
  { name: 'Ayuda', href: '#', current: false }
]

const classNames = (...classes: string[]) => classes.filter(Boolean).join(' ')

export function NavBar() {
  return (
    <Disclosure as="nav" className="border-b-2 border-gray-300">
      {({ open }) => (
        <>
          <div className="mx-1 max-w-full px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden"></div>
              <div className="flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex shrink-0 items-center">
                  <Link
                    href="/"
<<<<<<< HEAD
                    className={`${bungee.className} h-16 pl-2 pt-4 text-3xl font-bold md:pl-10 md:text-4xl`}
=======
                    className={`${bungee.className} h-16 pl-5 pt-4 text-2xl font-bold md:pl-10 md:text-4xl`}
>>>>>>> 6ec8bfb276eee6b2afc77afff9ea3bb855a23ffb
                  >
                    BaseBloom
                  </Link>
                </div>
              </div>
              <div className=" inset-y-0 right-0 mr-2  flex items-center rounded-3xl border-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <Menu as="div" className="px-1 sm:px-2">
                  <div>
                    <Menu.Button className="flex items-center space-x-2 rounded-full p-1 text-sm focus:outline-none focus:ring-4 focus:ring-white focus:ring-offset-4 focus:ring-offset-gray-700 ">
                      <span className="sr-only">Open user menu</span>
                      <Bars3Icon className="h-6 w-6 bg-white text-gray-700 sm:h-10" />
                      <div className="relative h-7 w-7 overflow-hidden rounded-full bg-white">
                        <UserIcon className="absolute -left-1 h-9 w-9 bg-gray-400 text-white" />
                      </div>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    {/* TODO: Fix this ring-opacity issue: */}
                    {/* eslint-disable-next-line tailwindcss/migration-from-tailwind-2 */}
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {dropdownOptions.map((option, index) => (
                        <Menu.Item key={index}>
                          {({ active }) => (
                            <Link
                              href={option.href}
                              className={classNames(
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
        </>
      )}
    </Disclosure>
  )
}
