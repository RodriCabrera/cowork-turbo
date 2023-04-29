export const CompanyBanner = () => {
  return (
    <section className="max-w-7xl px-4 pt-6 sm:w-auto md:pt-10">
      <header
        className={
          ' m-1 text-center text-6xl text-gray-900 sm:text-7xl lg:text-8xl'
        }
        style={{
          backgroundImage: 'radial-gradient(#d9f99d 1px, transparent 0)',
          backgroundSize: '40px 40px',
          backgroundPosition: '-19px -19px'
        }}
      >
        The future of work is the future of the work
      </header>
    </section>
  )
}
