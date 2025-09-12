import { z } from 'zod'

export const validator = {
  sign_in: z.object({
    email: z.string().max(256).min(3),
    password: z.string().max(71).min(8)
  }),
  sign_up: z.object({
    email: z.string().max(256).min(3),
    password: z.string().max(71).min(8),
    name: z.string().max(100).min(3)
  })
}