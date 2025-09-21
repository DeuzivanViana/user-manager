import Elysia, { t } from 'elysia'
import { macroAuth } from '../http/plugins/better-auth'
import { createPost } from '../controller/post-controller'

export const postRouter = new Elysia({ prefix: '/post' })
  .use(macroAuth)
  .post('/', async ({ session, body }) => createPost(session, body), {
    auth: true
  })