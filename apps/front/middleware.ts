import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getIronSession } from 'iron-session/edge'

export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next()
  const session = await getIronSession(req, res, {
    cookieName: 'bloom-auth',
    password: process.env.IRON_PASSWORD || 'undefined',
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production'
    }
  })

  const { superadmin, admin } = session
  const { pathname } = req.nextUrl

  // ADMIN PROTECTED ROUTES:
  if (
    !admin &&
    (pathname.startsWith('/dashboard') || pathname.startsWith('/people'))
  ) {
    return NextResponse.redirect(new URL('/', req.url))
  }
  // ADMIN REDIRECTS:
  if (
    admin &&
    (pathname.startsWith('/login') || pathname.startsWith('/register'))
  ) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  // SUPERADMIN REDIRECTS:
  // if the superadmin is logged in, redirect from login to coworks
  if (superadmin && pathname === '/superadmin') {
    return NextResponse.redirect(new URL('/superadmin/coworks', req.url))
  }
  // if NO superadmin, protect /superadmin routes
  if (!superadmin && pathname.startsWith('/superadmin/')) {
    return NextResponse.redirect(new URL('/superadmin', req.url))
  }

  return res
}
