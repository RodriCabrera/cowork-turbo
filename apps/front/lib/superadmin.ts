import { withSessionSsr } from './withSession'

export const getSuperAdminData = withSessionSsr(async ({ req }) => {
  return {
    props: { superadmin: req.session.superadmin }
  }
})
