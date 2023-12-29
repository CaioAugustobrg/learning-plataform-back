import { type Express } from 'express'
import session from 'express-session'

export const setupExpressSession = (app: Express): void => {
  app.use(
    session({
      secret: 'learning-back',
      resave: false,
      saveUninitialized: false
    })
  )
}
