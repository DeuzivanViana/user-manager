import { z } from 'zod'

export const signUpScheme = z.object({
  email: z.email().max(100),
  username: z.string().trim().min(3).max(64),
  password: z.string().min(8).max(64),
  display_name: z.string().min(3).max(64)
})

export const signInScheme = z.object({
  email: z.email().max(100),
  password: z.string().min(8).max(64)
})

export const postScheme = z.object({
  title: z.string().min(4).max(64),
  content: z.string().min(6).max(512)
})

export const userCan = (user, role) => {
  return user.roles.includes(role)
}

export const createSubscriptionScheme = z.object({
  email: z.email().max(100),
  type: z.string().max(32)
})