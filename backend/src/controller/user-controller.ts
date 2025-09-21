import { status } from 'elysia'
import { db } from '../lib/database'
import { pick } from 'lodash'

export const getCurrentUser = async (
  session: any
) => {
  const user = await db.user.findUniqueOrThrow({
    where: {
      id: session.userId
    }
  })

  return status(200, pick(user, ['id', 'roles', 'email', 'name']))
}