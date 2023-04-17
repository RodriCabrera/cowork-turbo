import { App, Router } from './app'
import 'dotenv/config'
import userRoutes from './user/userRouter'

const port = process.env.PORT ?? 8000

const routes: Router[] = [{ path: '/user', router: userRoutes }]

const app = new App(port.toString(), routes, 'Cowork API')

app.start()
