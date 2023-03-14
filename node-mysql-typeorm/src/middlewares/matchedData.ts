import { Request, Response, NextFunction } from 'express'

export default async (req: Request, res: Response, next: NextFunction) => {
  const matchedData = ['email', 'password']
  if (req.url === '/register' || req.url === '/register/')matchedData.push('role', 'username')
  for (const key in req.body) {
    if (!matchedData.includes(key)) {
      return res.status(400).send({ errors: [`Invalid property ${key}`] })
      console.log('hereeeeeeeeeee');
    }
  }
  next()
}
