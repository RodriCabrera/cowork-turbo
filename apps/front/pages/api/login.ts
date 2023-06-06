import { NextApiRequest, NextApiResponse } from 'next'
import jwt_decode from 'jwt-decode'

import { UserJWT } from 'types'

import { withSessionRoute } from '@/modules/auth/utils/withSession'
import Axios from '@/common/utils/axios'

export default withSessionRoute(login)

async function login(req: NextApiRequest, res: NextApiResponse) {
  const api = Axios.getInstance()

  const { access_token } = req.query
  if (typeof access_token !== 'string') return res.redirect('/')

  const userData: UserJWT = jwt_decode(access_token)
  const { id, token } = userData

  try {
    const response = await api.post('users/auth', { id, token })

    // TODO: Implement better error handling
    // 1. Invalid token
    // 2. Token already used

    const isAuthOk = response.status === 200

    if (isAuthOk) {
      req.session.user = {
        ...userData,
        access_token // We are using this value for the API header
      }
      await req.session.save()
      return res.redirect('/dashboard')
    } else {
      return res.redirect('/') // TODO: Replace with some route with error notification
    }
  } catch (err) {
    res.status(500).json(err)
  }
}
