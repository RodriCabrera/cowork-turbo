import React, { FC } from 'react'

export const ContactBanner: FC = () => {
  return (
    <section className="max-w-7xl px-4 pt-6 sm:w-auto md:pt-10">
      <header className="m-1 text-6xl text-gray-900 sm:text-7xl lg:text-8xl">
        Make your company Bloom
        <span className="text-green-300">.</span>
      </header>
      <div className="mt-11 flex justify-end">
        <div className="mx-2 flex w-full flex-wrap text-2xl text-gray-600 sm:flex  md:text-4xl">
          <p>
            Let&apos;s work toghether!
          </p>
          <p className="text-green-300">Let us know about you so we can help your bussiness.</p>
        </div>
      </div>
    </section>
  )
}
