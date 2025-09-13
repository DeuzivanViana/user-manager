import { status } from 'elysia'
import { auth } from '../lib/auth'
import { fromNodeHeaders } from 'better-auth/node'
import { db } from '../lib/database'
import { pick } from 'lodash'

export const getCurrentUser = async (
  headers: Record<string, string | undefined>
) => {
  const data = await auth.api.getSession({ headers: fromNodeHeaders(headers)}) 

  const user = await db.user.findUniqueOrThrow({
    where: {
      id: data?.user.id
    }
  })

  if(!data?.session) return status(401, { message: 'No session valid detected...' })

  return status(200, pick(user, ['id', 'roles', 'email', 'name']))
}