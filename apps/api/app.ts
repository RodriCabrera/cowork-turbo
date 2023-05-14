import express from 'express'
import cors from 'cors'
import MailService from './mail/mailService'
import errorHandler from './errors/errorHandler'
import notAllowedHandler from './errors/404handler'

// Desacoplar
import swaggerUi from 'swagger-ui-express'
import { Server } from 'http'

export interface Router {
  path: string
  router: express.Router
}

export class App {
  app: express.Application
  private _server: Server = new Server()

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
    this.app.use(cors())
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
    const mail = MailService.getInstance()
    mail.createConnection()
  }

  private _initErrorHandlers() {
    this.app.use(notAllowedHandler)
    this.app.use(errorHandler)
  }

  start() {
    this._initMiddleware()
    this._initRoutes()
    this._initErrorHandlers()
    this._server = this.app.listen(this.port, () => {
      console.log(`${this.name} Server running on port ${this.port}`)
    })
    this._server.on('error', (err) => {
      console.error('Server error: ', err)
      return this.start()
    })
  }

  stop() {
    this._server.close()
  }
}
