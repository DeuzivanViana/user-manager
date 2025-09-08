import { db } from '../infra/database'
import jwt from 'jsonwebtoken'
import { createSubscriptionScheme, userCan } from '../models/validator'

export const createSubscription = async (req, res) => {
  try {
    const body = createSubscriptionScheme.parse(req.body)
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
      res.status(403).json({msg: 'You don\'t have permission to use this feature.'})
      return
    }

    const member = await db.user.findFirstOrThrow({
      where: {
        email: body.email
      }
    })

    const SESSION_EXPIRATION_IN_SECONDS = 60 * 60 * 24 * 30; 
    const expiresAt = new Date(Date.now() + 1000 * SESSION_EXPIRATION_IN_SECONDS);

    const subcription = await db.subscription.create({
      data: {
        user_id: member.id,
        type: body.type,
        expires_at: expiresAt
      }
    })

    res.status(200).json(subcription)
  } catch(error) {
    console.log(error)
    res.status(500).json({msg: error.message})
  }
}
