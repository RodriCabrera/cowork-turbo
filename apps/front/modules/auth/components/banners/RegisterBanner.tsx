import { bungee } from '@/common/styles/fonts'

interface RegisterBannerProps {
  isCompany: boolean
  goToCompanyRegister: () => void
  goToFreelancerRegister: () => void
}

export const RegisterBanner = ({
  isCompany,
  goToCompanyRegister,
  goToFreelancerRegister
}: RegisterBannerProps) => {
  return (
    <div
      className={`flex w-full items-center justify-center bg-gradient-to-r from-transparent ${
        isCompany ? 'to-amber-200/75' : 'to-cyan-100'
      }`}
    >
      <div className="flex max-w-3xl flex-col items-start gap-5 p-6">
        <p className={`text-2xl md:text-4xl ${bungee.className} text-gray-800`}>
          Almost there!
        </p>
        {isCompany ? (
          <>
            <p>
              You&apos;re about to register as a{' '}
              <span className={`font-bold ${bungee.className}`}>company</span>,
              which means that you&apos;ll manage your collaborator list, and
              you&apos;ll be in charge of the organization&apos;s credits.
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
              <span className={` ${bungee.className}`}>freelancer</span>, which
              means that you&apos;ll only be making reservations for yourself.
            </p>
            <button
              onClick={goToCompanyRegister}
              className="text-left font-thin"
            >
              If you have people in charge and you need to manage their credits,
              click here to register as a Company
            </button>
          </>
        )}
      </div>
    </div>
  )
}
