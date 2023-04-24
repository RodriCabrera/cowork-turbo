export const ironOptions = {
  cookieName: 'bloom-auth',
  password: process.env.IRON_PASSWORD || 'keyboardcat',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production'
  }
}
