import React from 'react'

export const AboutPage = () => {
  return (
    <div className="h-screen">
      <div className="mx-auto inline-block max-w-7xl pt-24 sm:w-auto sm:pt-32 lg:px-8">
        <p className="m-1 text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-8xl">
          We help businesses find the right way to work
          <text className="text-4xl text-red-600 sm:text-8xl"> .</text>
        </p>
        <section className="float-right box-border block  w-full pt-16 sm:flex sm:w-2/3">
          <p className="mx-2 text-sm leading-8 text-gray-600">
            Quis tellus eget adipiscing convallis sit sit eget aliquet quis.
            Suspendisse eget egestas a elementum pulvinar et feugiat blandit at.
            In mi viverra elit nunc.
          </p>
          <p className="mx-2 text-sm leading-8 text-gray-600">
            Quis tellus eget adipiscing convallis sit sit eget aliquet quis.
            Suspendisse eget egestas a elementum pulvinar et feugiat blandit at.
            In mi viverra elit nunc.
          </p>
        </section>
      </div>
      <p className="mx-auto my-12 w-full bg-gray-200 px-10 text-lg sm:my-24 sm:w-2/3 sm:py-12 sm:text-2xl">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam
        blanditiis, ipsa consequatur sint suscipit reprehenderit mollitia
        corrupti id ex esse nam doloremque vel a voluptatem, magnam possimus
        aspernatur! Labore, ipsum.
      </p>
    </div>
  )
}

export default AboutPage
