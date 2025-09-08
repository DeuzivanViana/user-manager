import { signInScheme, signUpScheme } from '../models/validator'
import { db } from '../infra/database'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const signUp = async (req, res) => {
  try {
    const body = signUpScheme.parse(req.body)
    const password_hash = await bcrypt.hash(body.password, 14)

    const user = await db.user.create({
      data: {
        username: body.username,
        email: body.email,
        display_name: body.display_name,
        password_hash: password_hash
      }
    })

    if(!user) {
      res.sendStatus(409)
      return
    }

    res.sendStatus(200)
  } catch(error) {
    res.status(500).json({msg: error.message})
  }
}

export const signIn = async (req, res) => {
  try {
    const body = signInScheme.parse(req.body)

    const user = await db.user.findUniqueOrThrow({
      where: {
        email: body.email
      }
    })
    
    if(!user) {
      res.sendStatus(404)
      return
    }

    const is_valid_password = await bcrypt.compare(body.password, user.password_hash)
    
    if(!is_valid_password) {
      res.sendStatus(401)
      return
    }

    const token = jwt.sign({
      id: user.id,
      username: user.username,
      display_name: user.display_name
    }, process.env.JWT_SECRET)

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000
    })

    res.sendStatus(200)
  } catch(error) {
    res.status(500).json({msg: error.message})
  }
}

export const verifyToken = async (req, res) => {
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
    
    res.sendStatus(200)
  } catch(error) {
    res.status(500).json({msg: error.message})
  }
}