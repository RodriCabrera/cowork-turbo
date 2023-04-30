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

  // do anything with session here:
  const { superadmin } = session

  // like mutate superadmin:
  // superadmin.something = someOtherThing;
  // or:
  // session.superadmin = someoneElse;

  // uncomment next line to commit changes:
  // await session.save();
  // or maybe you want to destroy session:
  // await session.destroy();

  const { pathname } = req.nextUrl

  if (superadmin && pathname === '/superadmin') {
    return NextResponse.redirect(new URL('/superadmin/coworks', req.url))
  }

  if (!superadmin && pathname !== '/superadmin') {
    return NextResponse.redirect(new URL('/superadmin', req.url))
  }

  return res
}

export const config = {
  matcher: ['/superadmin/:path*']
}
