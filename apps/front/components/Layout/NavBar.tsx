'use client'

import Link from 'next/link'
import { bungeeHairline } from '@/styles/fonts'
import { NavMenu } from './NavMenu'

export function NavBar() {
  return (
    <nav className="border-b-2 bg-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex items-center justify-center sm:items-stretch sm:justify-start">
            <header>
              <Link
                href="/"
                className={`${bungeeHairline.className} h-16 text-3xl`}
              >
                BaseBloom
              </Link>
            </header>
          </div>
          {/* Profile dropdown */}
          <NavMenu />
        </div>
      </div>
    </nav>
  )
}
