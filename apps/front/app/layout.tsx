import { PropsWithChildren } from 'react'

import { Footer } from '@/components/Layout/Footer'
import { NavBar } from '@/components/Layout/NavBar'
import { raleway } from '@/styles/fonts'

import './globals.css'

export const metadata = {
  title: 'BaseBloom',
  description: 'BaseBloom is a coworking network.'
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <div className={`${raleway.className}`}>
          <NavBar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  )
}
