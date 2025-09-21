import { Elysia, t } from 'elysia'
import cors from '@elysiajs/cors'
import { userRouter } from './routes/user'
import { errorHandler } from './utils/error-handler'
import { betterAuthPlugin } from './http/plugins/better-auth'
import { postRouter } from './routes/post'

const app = new Elysia({
  serve: {
    hostname: '0.0.0.0'
  },
  prefix: '/api/v1'
})
  .use(errorHandler)
  .use(betterAuthPlugin)
  .use(cors({
    origin: "http://192.168.1.103:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  }))
  .use(userRouter)
  .use(postRouter)
  .listen(3333)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)
