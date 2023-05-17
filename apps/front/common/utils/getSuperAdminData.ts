import { withSessionSsr } from '../../modules/auth/utils/withSession'

export const getSuperAdminData = withSessionSsr(async ({ req }) => {
  return {
    props: { superadmin: req.session.superadmin }
  }
})
