import { Router, Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { NOT_FOUND } from '../constants'
import { 
  createFollowe,
  deleteFollowe,
  findFollowes,
  findFollowesProductId,
  updateFollowe
} from '../controllers/Review'

const router: Router = Router()

router.get('/', async (req: Request, res: Response) => {
  try {
    console.log('get');
    const followes = await findFollowes(null, true)
    console.log("followes");
    console.log(followes);
    
    followes.length ? res.send(followes) : res.sendStatus(404)
  } catch (error) {
    res.sendStatus(500)
  }
})


router.get('/:id', async (req: Request, res: Response) => {
  try {
    const withRelations = req.query.withRelations === 'true'
    const order = await findFollowesProductId(+req.params.id, withRelations)    
    console.log(order);
                    
    order.length > 0 ? res.send(order) : res.status(404).send([{text:'עדין לא הוכנסו תגובות'}])
  } catch (error) {
    console.log('error');
    console.error(error)
    res.sendStatus(500)
  }
})

router.post('/', async (req: Request, res: Response) => {
  try {
    const {products, ...followesProperties } = req.body
    console.log({products, ...followesProperties });
    
    const newfollowes = await createFollowe(followesProperties, products)
    res.send(newfollowes)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
})

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const isDeleted = await deleteFollowe(+req.params.id)
    isDeleted
      ? res.send(`order ${req.params.id} is deleted`)
      : res.send('Nothing is deleted')
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
})

router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const responseData = await updateFollowe(+req.params.id, req.body)
    responseData === NOT_FOUND
      ? res.sendStatus(404)
      : res.send(responseData)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
})


export default router
