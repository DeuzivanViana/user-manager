import { z } from 'zod'

export const scheme = {
  post: z.object({
    title: z.string().max(128).min(4),
    content: z.string().max(256).min(16)
  })
}

export const userCan = (user: any, role: string) => {
  return user.roles.includes(role)
}