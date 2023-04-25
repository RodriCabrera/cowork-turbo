import { withSessionSsr } from './withSession'

export const protectSuperadminRoute = withSessionSsr(async ({ req }) => {
  const { user } = req.session

  if (!user) {
    return {
      redirect: {
        destination: '/superadmin',
        permanent: false
      }
    }
  }

  return {
    props: { user }
  }
})
