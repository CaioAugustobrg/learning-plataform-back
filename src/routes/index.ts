import express from 'express'

import AuthRouter from './auth.routes'

const router = express.Router()

router.use('/auth', AuthRouter)

export default router
