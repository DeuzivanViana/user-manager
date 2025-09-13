import Elysia, { t } from 'elysia'
import { getCurrentUser } from '../controller/user-controller'

export const userRouter = new Elysia({ prefix: '/user' })
  .get('/', async ({ headers }) => getCurrentUser(headers))