import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextApiHandler
} from 'next'
import { withIronSessionApiRoute, withIronSessionSsr } from 'iron-session/next'

// For more info: https://github.com/vvo/iron-session#session-wrappers

export const ironOptions = {
  cookieName: 'bloom-auth',
  password: process.env.IRON_PASSWORD || 'keyboardcat',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production'
  }
}

export function withSessionRoute(handler: NextApiHandler) {
  return withIronSessionApiRoute(handler, ironOptions)
}

export function withSessionSsr<
  P extends { [key: string]: unknown } = { [key: string]: unknown }
>(
  handler: (
    context: GetServerSidePropsContext
  ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>
) {
  return withIronSessionSsr(handler, ironOptions)
}
