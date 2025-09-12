import { status } from 'elysia'
import { auth } from '../lib/auth'
import { fromNodeHeaders } from 'better-auth/node'

export const getCurrentUser = async (
  headers: Record<string, string | undefined>
) => {
  const data = await auth.api.getSession({ headers: fromNodeHeaders(headers)}) 
  
  if(!data?.session) return status(401, { message: 'No session valid detected...' })

  return status(200, data.user)
}