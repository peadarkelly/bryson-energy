import { Application } from 'express'
import * as helmet from 'helmet'

export function attachHeaders(app: Application): void {
  const oneYearInSeconds = 31536000

  app.use(helmet())
  app.use(helmet.noCache())
  app.use(helmet.noSniff())
  app.use(helmet.hidePoweredBy())
  app.use(helmet.referrerPolicy())
  app.use(helmet.xssFilter())
  app.use(helmet.frameguard({ action: 'deny' }))
  app.use(helmet.hsts({ maxAge: oneYearInSeconds }))

  app.disable('x-powered-by')
}
