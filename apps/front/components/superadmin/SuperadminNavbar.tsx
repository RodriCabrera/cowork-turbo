import { bungee } from '@/styles/fonts'
import { AuthenticatedNavbar } from './AuthenticatedNavbar'
import { PropsWithUser } from '@/../../packages/types'

export const SuperadminNavbar = ({ user }: PropsWithUser) => {
  return (
    <nav
      className={`${bungee.className} flex h-16 justify-between border-b-2 pl-10 pt-3 text-3xl font-bold`}
    >
      BaseBloom
      {user && <AuthenticatedNavbar user={user} />}
    </nav>
  )
}
