import { withSessionSsr } from '../../modules/auth/utils/withSession'

export const getAdminSession = withSessionSsr(async ({ req }) => {
  const { session } = req
  return {
    props: { admin: session.admin || null }
  }
})
