import { NextApiRequest, NextApiResponse } from 'next'
import jwt_decode from 'jwt-decode'

import { withSessionRoute } from '@/modules/auth/utils/withSession'
import { SuperAdminData } from 'types'

export default withSessionRoute(login)

async function login(req: NextApiRequest, res: NextApiResponse) {
  const { access_token } = req.query

  if (typeof access_token !== 'string') return res.end()

  const superAdminData: SuperAdminData = jwt_decode(access_token)
  const { name, mail, iat, ...idAndToken } = superAdminData

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/superadmins/auth`,
      {
        method: 'POST',
        body: JSON.stringify(idAndToken),
        headers: { 'Content-type': 'application/json' }
      }
    )

    // TODO: Implement better error handling
    // 1. Invalid token
    // 2. Token already used

    const isAuthOk = (await response.status) === 200

    if (isAuthOk) {
      req.session.superadmin = { ...superAdminData, access_token }
      await req.session.save()
      return res.redirect('/superadmin/coworks')
    }
    return res.redirect('/superadmin')
  } catch (err) {
    res.status(500).json(err)
  }
}
