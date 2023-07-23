import { withSessionSsr } from '../../modules/auth/utils/withSession'

export const getUserSession = withSessionSsr(async ({ req }) => {
  const { session } = req
  return {
    props: { user: session.user || null }
  }
})
