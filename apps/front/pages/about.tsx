import { AboutBanner } from '@/modules/landing/banners/AboutBanner'
import React from 'react'

export const AboutPage = () => {
  return (
    <div className="flex min-h-[calc(100vh-126px)] justify-center bg-gray-50 pb-20 md:p-0">
      <AboutBanner />
    </div>
  )
}

export default AboutPage
