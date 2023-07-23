import { bungeeHairline } from '@/common/styles/fonts'
import Link from 'next/link'
import React, { PropsWithChildren } from 'react'

export const Sidebar = ({ children }: PropsWithChildren) => {
  return (
    <aside className="flex h-20 flex-row gap-6 bg-gray-50 p-6 text-sm md:h-full md:w-40 md:flex-col">
      <Link href={'/'} className="flex flex-row md:flex-col">
        <p className={`${bungeeHairline.className} text-xl`}>Base</p>
        <p className={`${bungeeHairline.className} text-xl`}>bloom</p>
      </Link>
      {children}
    </aside>
  )
}
