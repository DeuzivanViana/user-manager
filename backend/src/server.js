import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { routerAuth } from './routes/auth'
import { routerPost } from './routes/post'
import { routerSubscription } from './routes/subscription'
import { routerUser } from './routes/user'

const app = express()
const PORT = 3333

app.use(cookieParser())
app.use(cors({
  origin: "http://192.168.1.105:3000",
  credentials: true
}))
app.use(express.json())

app.use('/api/v1', routerAuth)
app.use('/api/v1', routerPost)
app.use('/api/v1', routerSubscription)
app.use('/api/v1', routerUser)

app.listen(
  PORT, '0.0.0.0',
  () => {
    console.log(`Server running at http://192.168.1.105:${PORT}`)
  }
)
