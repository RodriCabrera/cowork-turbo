import 'dotenv/config'

const config = {
  sessionSecret: process.env.SESSION_SECRET || 'keyboardcat'
}

export default config
