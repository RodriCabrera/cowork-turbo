import 'dotenv/config'

const config = {
  sessionSecret: process.env.SESSION_SECRET || 'keyboardcat',
  gmail: {
    user: process.env.GMAIL_USER || '',
    pass: process.env.GMAIL_PASS || ''
  },
  clientUrl:
    process.env.NODE_ENV !== 'production'
      ? 'http://localhost:3000'
      : 'https://cowork-turbo-front.vercel.app'
}

export default config
