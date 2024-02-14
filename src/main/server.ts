/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
// import { setupExpressSession } from './main/config/express-session'
import router from './routes'
import express from 'express'
import session from 'express-session'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import redisClient from './config/redis-client'
import connectRedis from 'connect-redis'
const RedisStore = connectRedis(session)
const redisStoreInstance = new RedisStore({ client: redisClient })
// const redisClient = new IORedis(process.env.REDIS_URL ?? 'redis://127.0.0.1:6379')
// import { setupExpressSession } from './main/config/express-session'
// const redis = new Redis({
//   host: '127.0.0.1', // Endereço do host do contêiner Docker
//   port: 6379 // Porta padrão do Redis
// })
const app = express()
app.use(cors({
  origin: 'http://127.0.0.1:5173',
  credentials: true
}))
app.use(express.json())
app.use(router)
app.use(cookieParser('keyboard cat'))

app.use(
  session({
    name: 'teste',
    store: redisStoreInstance,
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      // domain: process.env.COOKIE_DOMAIN,
      sameSite: 'none',
      maxAge: 20000
    }
  })
)
// app.use(
//   expressSession({
//     resave: false,
//     saveUninitialized: true,
//     secret: 'keyboard cat',
//     cookie: { secure: false }
//   })
// )

const port = 3030

// Conectar ao servidor Redis

// Define uma chave e um valor no Redis

// Obtém o valor de uma chave do Redis

app.listen(port, async () => {
  redisClient.mset('222', 'asd22222222asdas')
  console.log(`Express started on http://127.0.0.1:${port}; press CTRL + C to terminate.`)
})
