import { log } from 'console'
import { Router, Request, Response } from 'express'
import { 
  analayzeQuantity,
   createProduct,
    findProducts,
    findProductsToRundom,   
    updateProduct } from '../controllers/products'
import { deleteProduct } from '../controllers/products'

const router: Router = Router()

router.post('/', async (req: Request, res: Response) => {
  try {
    const newProduct = await createProduct(req.body)
    res.send(newProduct)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
})



router.get('/:id', async (req: Request, res: Response) => {
  try {
    const withRelations = req.query.withRelations === 'true'
    const [product] = await findProducts(+req.params.id, withRelations)
    product ? res.send(product) : res.sendStatus(404)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
})

router.get('/rundom/:id', async (req: Request, res: Response) => {
  try {
    console.log('start')
    const withRelations = req.query.withRelations === 'true'
    const product = await findProductsToRundom(+req.params.id, withRelations)
    product ? res.send(product) : res.sendStatus(404)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
})

router.get('/', async (req: Request, res: Response) => {
  try {
    const products = await findProducts(null, true) 
    products.length ? res.send(products) : res.sendStatus(404)
  } catch (error) {
    res.sendStatus(500)
  }
})

router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const isUpdated = await updateProduct(+req.params.id, req.body)
    isUpdated
      ? res.send(`Product ${req.params.id} is updated`)
      : res.send('Nothing is updated')
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
})

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const isDeleted = await deleteProduct(+req.params.id)
    isDeleted
      ? res.send(`Product ${req.params.id} is deleted`)
      : res.send('Nothing is deleted')
  } catch (error: any) {
    console.error(error)
    if (error.errno === 1451) {
      return res.sendStatus(405)
    }
    res.sendStatus(500)
  }
})

export default router
