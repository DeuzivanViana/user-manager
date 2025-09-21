import { status } from 'elysia'
import { db } from '../lib/database'
import { pick } from 'lodash'
import { scheme, userCan } from  '../utils/validator'
import { v4 as uuid } from 'uuid'

export const createPost = async (
  session: any,
  body: any
) => {
  const data = scheme.post.parse(body)

  const user = await db.user.findUniqueOrThrow({
    where: {
      id: session.userId
    }
  })

  if(!userCan(user, 'admin')) {
    return status(403, { message: 'You don\'t have permission to use this action.' })
  }

  const post = await db.post.create({
    data: {
      id: uuid(),
      userId: user.id,
      title: data.title,
      content: data.content
    }
  })

  return status(200)
}