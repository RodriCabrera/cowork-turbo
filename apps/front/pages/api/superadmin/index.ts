import { NextApiRequest, NextApiResponse } from 'next'
import jwt_decode from 'jwt-decode'

import { withSessionRoute } from '@/lib/withSession'
import { UserData } from 'types'

export default withSessionRoute(login)

async function login(req: NextApiRequest, res: NextApiResponse) {
  const { access_token } = req.query

  if (typeof access_token !== 'string') return res.end()

  const userData: UserData = jwt_decode(access_token)
  const { name, mail, iat, ...idAndToken } = userData

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
      req.session.user = userData
      await req.session.save()
      return res.redirect('/superadmin/coworks')
    }
    return res.redirect('/superadmin')
  } catch (err) {
    res.status(500).json(err)
  }
}
