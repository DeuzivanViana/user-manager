import { db } from '../infra/database'
import jwt from 'jsonwebtoken'
import { userCan } from '../models/validator'

export const getUsers = async (req, res) => {
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

    if(!userCan(user, 'admin')) {
      res.status(403).json({message: 'You don\'t have permission to use this feature.'})
      return
    }

    const posts = await db.user.findMany()

    res.status(200).json(posts)
  } catch(error) {
    console.log(error)
    res.status(500).json({message: 'Unknown error'})
  }
}