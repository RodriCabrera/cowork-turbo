import 'dotenv/config'

const config = {
  sessionSecret: process.env.SESSION_SECRET || 'keyboardcat',
  gmail: {
    user: process.env.GMAIL_USER || '',
    pass: process.env.GMAIL_PASS || ''
  }
}

export default config
