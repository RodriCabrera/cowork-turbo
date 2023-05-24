import { bungee } from '@/common/styles/fonts'
import Link from 'next/link'
import React, { PropsWithChildren } from 'react'

export const Sidebar = ({ children }: PropsWithChildren) => {
  return (
    <aside className="flex h-20 justify-between bg-gray-50 p-6 text-sm md:h-full md:w-40">
      <Link href={'/'}>
        <p className={`${bungee.className}`}>Base</p>
        <p className={`${bungee.className}`}>bloom</p>
      </Link>
      {children}
    </aside>
  )
}
