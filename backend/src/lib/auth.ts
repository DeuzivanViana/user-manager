import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { PrismaClient } from '../generated/prisma'
import Elysia from 'elysia'

const prisma = new PrismaClient()

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'sqlite',
  }),
  emailAndPassword: {
    enabled: true
  },
  baseURL: 'http://192.168.1.103:3333',
  basePath: '/api/v1/auth',
  trustedOrigins: ['http://192.168.1.103:3000']
})

export const betterAuthRouter = new Elysia({ name: 'better-auth' })
  .mount(auth.handler)