// import IORedis from 'ioredis'
// import session from 'express-session'
// import connectRedis from 'connect-redis'
// import express from 'express'
// const redisClient = new IORedis(process.env.REDIS_URL ?? 'redis://127.0.0.1:6379')
// const RedisStore = connectRedis(session)
// const app = express(
// )
// app.use(
//   session({
//     store: new RedisStore({ client: redisClient }),
//     secret: 's',
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       secure: false,
//       httpOnly: true,
//       maxAge: 1000 * 60 * 60 * 3
//     }
//   })
// )
