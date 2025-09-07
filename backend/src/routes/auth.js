import express from 'express'
import { signIn, signUp, verifyToken } from '../controller/auth-controller'

const router = express.Router()

router.post('/auth/sign-up', signUp)
router.post('/auth/sign-in', signIn)
router.get('/auth/check-token', verifyToken)

export { router as routerAuth }