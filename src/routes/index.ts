import express from 'express'

import AuthRouter from './auth.routes'
import AdminRouter from './admin.routes'

const router = express.Router()

router.use('/auth', AuthRouter)

router.use('/admin', AdminRouter)

export default router
