import { Request, Response, NextFunction } from 'express'
import 'dotenv/config'
import jwt from 'jsonwebtoken'

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!'95792a1d403ca62260932de86c440e1c4e57b7d9559b58ed22416b07958b63ea511800fd2bf97cd0b17543fa89ec5c3f241d35c8e269f754bb37497c804f1119') {
      return res.sendStatus(500)
    }

    const { email } = req.body
    jwt.sign(
      { email },
      '95792a1d403ca62260932de86c440e1c4e57b7d9559b58ed22416b07958b63ea511800fd2bf97cd0b17543fa89ec5c3f241d35c8e269f754bb37497c804f1119',
      { expiresIn: '60m' },
      (err: Error | null, accessToken: string | undefined) => {
        if (err) {
          
          console.error(err)
          return res.sendStatus(500)
        }
        res.locals.accessToken = accessToken
        console.log(res.locals.accessToken ,'accessToken');
        
        next()
      }
    )
   
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}
