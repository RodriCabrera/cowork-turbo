import { App, Router } from './app'
import 'dotenv/config'
import userRoutes from './user/userRouter'
import companyRouter from './company/companyRouter'

const port = process.env.PORT ?? 8000

const routes: Router[] = [
  { path: '/user', router: userRoutes },
  { path: '/company', router: companyRouter }
]

const app = new App(port.toString(), routes, 'Cowork API')

app.start()
