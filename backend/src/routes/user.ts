import Elysia, { t } from 'elysia'
import { getCurrentUser } from '../controller/user-controller'
import { macroAuth } from '../http/plugins/better-auth'

export const userRouter = new Elysia({ prefix: '/user' })
  .use(macroAuth)
  .get('/', async ({ session }) => getCurrentUser(session), {
    auth: true
  })