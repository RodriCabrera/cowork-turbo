import { App } from './app'
import 'dotenv/config'

const port = process.env.PORT ?? 8000

const app = new App(port.toString(), 'Cowork API')

app.start()

export default app
