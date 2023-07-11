import { bungeeHairline } from '@/common/styles/fonts'
import Link from 'next/link'
import React from 'react'

export const Footer = () => {
  return (
    <div className="fixed bottom-0 h-16 w-full border-t-2 bg-white">
      <div
        className={`flex h-full items-center justify-center gap-20 ${bungeeHairline.className}`}
      >
        <Link href={'/about'}>About</Link>
        <Link href={'/contact'}>Contact</Link>
      </div>
    </div>
  )
}
