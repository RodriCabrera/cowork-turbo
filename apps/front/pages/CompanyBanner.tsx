export const CompanyBanner = () => {
  return (
    <div>
      <section className="container mx-2  items-center pb-12 md:px-4 lg:flex">
        <div>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA9IYkfamEco4c6HGZwxQ3CB8nGSvrid9wCQ&usqp=CAU"
            className="mx-10 mt-6 h-80 w-80 rounded-2xl sm:w-10/12 lg:w-full"
            alt="office-image"
          />
        </div>
        <div className="mx-20 flex-1 space-y-4 sm:text-center lg:text-left">
          <h1 className="text-4xl font-bold text-yellow-500">
            Bienvenid@s a ...
          </h1>
          <p className="max-w-xl leading-relaxed text-gray-500 sm:mx-auto lg:ml-0">
            Si estas buscando una oficina Coworking, este es tu lugar...
          </p>
        </div>
      </section>
    </div>
  )
}
