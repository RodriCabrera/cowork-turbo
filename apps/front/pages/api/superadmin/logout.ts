import { NextApiRequest, NextApiResponse } from 'next'

import { withSessionRoute } from '@/lib/withSession'

export default withSessionRoute((req: NextApiRequest, res: NextApiResponse) => {
  req.session.destroy()
  return res.redirect('/superadmin')
})
