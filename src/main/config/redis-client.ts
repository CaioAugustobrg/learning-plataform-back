import IORedis from 'ioredis'

const redisClient = new IORedis(process.env.REDIS_URL ?? 'redis://127.0.0.1:6379')

redisClient.on('connect', () => {
  console.log('connected to redis successfully!')
})

redisClient.on('error', (error: any) => {
  console.log('Redis connection error:', error)
})

export default redisClient
