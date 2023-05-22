export const RegisterBanner = ({
  isCompany,
  goToCompanyRegister,
  goToFreelancerRegister
}: {
  isCompany: boolean
  goToCompanyRegister: () => void
  goToFreelancerRegister: () => void
}) => {
  return (
    <div
      className={`flex w-full items-center justify-center ${
        isCompany ? 'bg-amber-200/75' : 'bg-cyan-100'
      }`}
    >
      <div className="flex max-w-3xl flex-col items-start gap-5 p-6">
        <p className="text-4xl">Almost there!</p>
        {isCompany ? (
          <>
            <p>
              You&apos;re about to register as a{' '}
              <span className="font-bold">company</span>, which means that
              you&apos;ll manage your collaborator list, and you&apos;ll be in
              charge of the organization&apos;s credits.
            </p>
            <button
              onClick={goToFreelancerRegister}
              className="text-start font-thin"
            >
              Are you a freelancer? Click here
            </button>
          </>
        ) : (
          <>
            <p>
              You&apos;re about to register as a{' '}
              <span className="font-bold">freelancer</span>, which means that
              you&apos;ll only be making reservations for yourself.
            </p>
            <button onClick={goToCompanyRegister} className="font-thin">
              If you have people in charge and you need to manage their credits,
              click here to sign in as a Company
            </button>
          </>
        )}
      </div>
    </div>
  )
}
