import { NextApiRequest, NextApiResponse } from 'next'
import jwt_decode from 'jwt-decode'

import { AdminData } from 'types'

import { withSessionRoute } from '@/modules/auth/utils/withSession'
import Axios from '@/common/utils/axios'

export default withSessionRoute(login)

async function login(req: NextApiRequest, res: NextApiResponse) {
  const api = Axios.getInstance()

  const { access_token } = req.query
  if (typeof access_token !== 'string') return res.redirect('/')

  const userData: AdminData = jwt_decode(access_token)
  const { id, token } = userData

  api
    .post('users/auth', { id, token })
    .then(() => {
      req.session.admin = { ...userData, access_token }
      req.session.save()
      return res.redirect('/AuthOK') // TODO: Replace with some authenticated route
    })
    .catch(() => res.redirect('/')) // TODO: Replace with some route with error notification
}
