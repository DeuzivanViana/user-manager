import { Elysia, t } from 'elysia'
import cors from '@elysiajs/cors'
import { betterAuthRouter } from './lib/auth'
import { userRouter } from './routes/user'
import { errorHandler } from './utils/error-handler'

const app = new Elysia({
  serve: {
    hostname: '0.0.0.0'
  },
  prefix: '/api/v1'
})
  .use(errorHandler)
  .use(cors({
    origin: "http://192.168.1.103:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  }))
  .mount(betterAuthRouter)
  .use(userRouter)
  .listen(3333)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)
