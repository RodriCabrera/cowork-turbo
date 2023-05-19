import { Router } from '../app'
import companyRouter from '../companies/companyRouter'
import coworkRoutes from '../coworks/coworkRouter'
import superAdminRouter from '../super_admins/superAdminRouter'
import userRoutes from '../users/userRouter'

const routes: Router[] = [
  { path: '/users', router: userRoutes },
  { path: '/companies', router: companyRouter },
  { path: '/coworks', router: coworkRoutes },
  { path: '/superadmins', router: superAdminRouter }
]

export default routes