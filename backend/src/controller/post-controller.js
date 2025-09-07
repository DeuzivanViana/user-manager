import { db } from '../infra/database'
import jwt from 'jsonwebtoken'
import { postScheme, userCan } from '../models/validator'

export const sendPost = async (req, res) => {
  try {
    const body = postScheme.parse(req.body)
    const token = req.cookies.token

    if (!token) {
      res.sendStatus(403)
      return
    }
    
    const payload = jwt.verify(token, process.env.JWT_SECRET)

    if(!payload) {
      res.sendStatus(401)
      return
    }

    const user = await db.user.findUniqueOrThrow({
      where: {
        id: payload.id
      }
    })

    if(!userCan(user, 'admin')) {
      res.status(403).json({message: 'You don\'t have permission to use this feature.'})
      return
    }

    const post = await db.post.create({
      data: {
        user_id: user.id,
        content: body.content,
        title: body.title,
        username: user.username
      }
    })

    res.sendStatus(200)
  } catch(error) {
    res.status(500).json({message: 'Unknown error'})
  }
}

export const getAllPosts = async (req, res) => {
  try {
    const token = req.cookies.token

    if (!token) {
      res.sendStatus(403)
      return
    }
    
    const payload = jwt.verify(token, process.env.JWT_SECRET)

    if(!payload) {
      res.sendStatus(401)
      return
    }

    const user = await db.user.findUniqueOrThrow({
      where: {
        id: payload.id
      }
    })

    if(!userCan(user, 'admin') && !userCan(user, 'read')) {
      res.status(403).json({message: 'You don\'t have permission to use this feature.'})
      return
    }

    const posts = await db.post.findMany()

    res.status(200).json(posts)
  } catch(error) {
    console.log(error)
    res.status(500).json({message: 'Unknown error'})
  }
}