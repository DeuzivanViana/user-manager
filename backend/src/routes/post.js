import express from 'express'
import { getAllPosts, sendPost } from '../controller/post-controller'

const router = express.Router()

router.post('/post', sendPost)
router.get('/post', getAllPosts)

export { router as routerPost }