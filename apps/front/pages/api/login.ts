import { NextApiRequest, NextApiResponse } from 'next'
import jwt_decode from 'jwt-decode'

import { UserJWT } from 'types'

import { withSessionRoute } from '@/modules/auth/utils/withSession'
import { TOKEN_INVALID } from '@/modules/auth/utils/errorMessages'

export default withSessionRoute(login)

async function login(req: NextApiRequest, res: NextApiResponse) {
  const { access_token } = req.query
  if (typeof access_token !== 'string') return res.redirect('/')

  const userData: UserJWT = jwt_decode(access_token)
  const { id, token } = userData

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/auth`,
      {
        method: 'POST',
        body: JSON.stringify({ id, token }),
        headers: { 'Content-type': 'application/json' }
      }
    )

    const isAuthOk = response.ok
    if (isAuthOk) {
      req.session.user = {
        ...userData,
        access_token // We are using this value for the API header
      }
      await req.session.save()
      return res.redirect('/dashboard')
    } else {
      return res.redirect(`/login?token_error=${TOKEN_INVALID}`) // TODO: Replace with some route with error notification
    }
  } catch (err) {
    res.status(500).json(err)
  }
}
