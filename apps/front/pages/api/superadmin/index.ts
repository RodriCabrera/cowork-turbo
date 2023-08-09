import { NextApiRequest, NextApiResponse } from 'next'
import jwt_decode from 'jwt-decode'

import { withSessionRoute } from '@/modules/auth/utils/withSession'
import { SuperAdminData } from 'types'
import { TOKEN_INVALID } from '@/modules/auth/utils/errorMessages'

export default withSessionRoute(login)

async function login(req: NextApiRequest, res: NextApiResponse) {
  const { access_token } = req.query

  if (typeof access_token !== 'string') return res.end()

  const superAdminData: SuperAdminData = jwt_decode(access_token)
  const { name, email, iat, ...idAndToken } = superAdminData

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/superadmins/auth`,
      {
        method: 'POST',
        body: JSON.stringify(idAndToken),
        headers: { 'Content-type': 'application/json' }
      }
    )

    const isAuthOk = response.status === 200

    if (isAuthOk) {
      req.session.superadmin = {
        ...superAdminData,
        access_token
      }
      await req.session.save()
      return res.redirect('/superadmin/coworks')
    }
    return res.redirect(`/superadmin?token_error=${TOKEN_INVALID}`)
  } catch (err) {
    res.status(500).json(err)
  }
}
