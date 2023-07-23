import { NextApiRequest, NextApiResponse } from 'next'

import { withSessionRoute } from '@/modules/auth/utils/withSession'

export default withSessionRoute((req: NextApiRequest, res: NextApiResponse) => {
  req.session.destroy()
  return res.redirect('/superadmin')
})
