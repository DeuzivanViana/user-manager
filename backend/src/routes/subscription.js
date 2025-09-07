import express from 'express'
import { createSubscription } from '../controller/subscription-controller'

const router = express.Router()

router.post('/subscription', createSubscription)

export { router as routerSubscription }