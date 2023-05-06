import { Request, Response, NextFunction } from 'express'
import jwt, { VerifyErrors } from 'jsonwebtoken'
import { Admin, Role } from '../types'
import { readFile } from 'fs/promises'

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization
    if (!authHeader) {
      return res.sendStatus(401)
    }
    const token = authHeader.split(' ')[1]
    if (!token) {
      return res.sendStatus(401)
    }

    if (!'95792a1d403ca62260932de86c440e1c4e57b7d9559b58ed22416b07958b63ea511800fd2bf97cd0b17543fa89ec5c3f241d35c8e269f754bb37497c804f1119') {
      return res.sendStatus(500)
    }

    jwt.verify(
      token,
     '95792a1d403ca62260932de86c440e1c4e57b7d9559b58ed22416b07958b63ea511800fd2bf97cd0b17543fa89ec5c3f241d35c8e269f754bb37497c804f1119',
      async (err: VerifyErrors | null, decoded: any) => {
        if (err) {
          return res.status(403).send({errors: ['You do not have permission']})
        }
        const { email } = decoded

        // const admins: Admin[] = JSON.parse(
        //   await readFile(`${process.cwd()}/../db/admins.json`, 'utf-8')
        // )

        // const [admin]: Admin[] = admins.filter((admin) => 
        //   admin.email === email
        // )

        // if (!admin) {
        //     return res.status(403).send({errors: ['You do not have permission']})
        // }

        // res.locals.admin = admin

        next()
      }
    )
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}
