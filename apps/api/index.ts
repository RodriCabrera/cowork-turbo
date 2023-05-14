import { App, Router } from './app'
import 'dotenv/config'
import userRoutes from './users/userRouter'
import companyRouter from './companies/companyRouter'
import coworkRoutes from './coworks/coworkRouter'
import superAdminRouter from './super_admins/superAdminRouter'

const port = process.env.PORT ?? 8000

const routes: Router[] = [
  { path: '/users', router: userRoutes },
  { path: '/companies', router: companyRouter },
  { path: '/coworks', router: coworkRoutes },
  { path: '/superadmins', router: superAdminRouter }
]

const app = new App(port.toString(), routes, 'Cowork API')

app.start()

export default app
