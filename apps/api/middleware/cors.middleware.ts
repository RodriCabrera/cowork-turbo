import cors, { CorsOptions } from 'cors'
import config from '../config/config'

const corsOptions: CorsOptions = {
  origin: config.clientUrl
}

export default cors(corsOptions)
