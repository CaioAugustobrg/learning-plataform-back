import { type Express } from 'express'
import session from 'express-session'
import RedisStore from 'connect-redis'
import { createClient } from 'redis'
export const setupExpressSession = (app: Express): void => {
  const redisClient = createClient({
    url: 'redis://username:password@redis-host:6379/0'
  })
  const redisStore = new RedisStore({
    client: redisClient
  })
  app.use(
    session({
      secret: 'learning-back',
      resave: false,
      store: redisStore,
      saveUninitialized: false
    })
  )
}
