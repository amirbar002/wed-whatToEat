import { Request, Response, NextFunction } from 'express' 
import {genSalt, hash} from 'bcryptjs'

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const salt = await genSalt()
        console.log(salt)                   
        const hashed = await hash(req.body.password, salt)
        console.log(hashed);
        res.locals.password = hashed
        next()
    } catch (error) {
        console.error(error)
        res.sendStatus(500)
    }
}



