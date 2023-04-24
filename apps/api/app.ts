import express from 'express'
import cors from 'cors'
import MailService from './mail/mailService'

// Desacoplar
import swaggerUi from 'swagger-ui-express'

export interface Router {
  path: string
  router: express.Router
}

export class App {
  app: express.Application

  constructor(
    public port: string,
    private routers: Router[],
    public name?: string
  ) {
    this.app = express()
  }

  private _initRoutes() {
    this.routers.forEach((router) => {
      this.app.use(router.path, router.router)
    })
  }

  // Desacoplar?
  private _initMiddleware() {
    this.app.use(express.json())
    this.app.use(express.static('public'))
    this.app.use(
      '/docs',
      swaggerUi.serve,
      swaggerUi.setup(undefined, {
        swaggerOptions: {
          url: '/swagger.json',
          name: this.name
        },
        customCss: '.swagger-ui .topbar { display: none }',
        customSiteTitle: this.name
      })
    )
    this.app.use(cors())
    const mail = MailService.getInstance()
    mail.createConnection()
  }

  start() {
    this._initMiddleware()
    this._initRoutes()
    const server = this.app.listen(this.port, () => {
      console.log(`${this.name} Server running on port ${this.port}`)
    })
    server.on('error', (err) => {
      console.error('Server error: ', err)
      return this.start()
    })
  }
}
