import express, { Router, type Request, type Response } from 'express'
import { setupExpressSession } from './main/config/express-session'

const app = express()

const route = Router()

app.use(express.json())
setupExpressSession(app)
route.get('/', (request: Request, response: Response) => {
  response.json({ message: 'hello world' })
})

app.use(route)

app.listen(3333, () => 'server running on port 3333')
