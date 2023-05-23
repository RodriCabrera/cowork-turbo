import { withSessionSsr } from '../../modules/auth/utils/withSession'

export const getAdminSession = withSessionSsr(async ({ req }) => {
  return {
    props: { admin: req.session.admin }
  }
})
