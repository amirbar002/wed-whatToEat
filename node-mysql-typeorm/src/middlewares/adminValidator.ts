import { compare } from 'bcryptjs'
import { Request, Response, NextFunction } from 'express'
import { readFile } from 'fs/promises'
import { Admin } from '../types'

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const url = `${__dirname}/../../../db/admins.json`

    const admins: Admin[] = JSON.parse(await readFile(url, 'utf-8'))

    const adminExisted: Admin[] = admins.filter(
      (admin: Admin) =>
        ((req.url === '/register' || req.url === '/register/') && admin.username === req.body.username) ||
        admin.email === req.body.email
    )

    if (adminExisted.length) {
      if (req.url === '/register' || req.url === '/register/') {
        return res
          .status(400)
          .send({ errors: ['username or email already exists'] })
      }

      const isValidPwd = await compare(
        req.body.password,
        adminExisted[0].password
      )

      if (!isValidPwd) {
        return res.sendStatus(401)
      }
    }
    next()
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}


// "@types/bcryptjs": "^2.4.2" -D "bcryptjs": "^2.4.3" "@types/jsonwebtoken": "^9.0.0" -D "jsonwebtoken": "^9.0.0  
// -D "password-validator": "^5.3.0"   "@types/express-validator": "^3.0.0" -D "express-validator": "^6.14.2"
// 