import { Router, Request, Response } from 'express'
import{ loginValidator, registerValidator }from '../middlewares/formValidator'
import jwtSign from '../middlewares/jwtSign'
import matchedData from '../middlewares/matchedData'
import passwordEncryptor from '../middlewares/passwordEncryptor'
import passwordValdator from '../middlewares/passwordValdator'
import {
  createPerson,
  deleteCustomer,
  findPerson,
  findPersonByEmail,
  updateCustomer
} from '../controllers/Person'
import { validationResult } from 'express-validator'
import jwtVerify from '../middlewares/jwtVerify'
import bcrypt, { hash } from 'bcrypt'
import { error } from 'console'

const router: Router = Router()

router.post('/register', 
[matchedData,
  ...registerValidator,
  passwordValdator,
  passwordEncryptor,
  jwtSign],
  async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    console.log("aaa");
    const newCustomer = await createPerson({
      ...req.body,
      password: res.locals.password
    })
    console.log(newCustomer);
    res.send({newCustomer,
    accessToken: res.locals.accessToken, })
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
})


router.post('/login', 
[matchedData,
  ...loginValidator,
  passwordValdator,
  // passwordEncryptor,
  jwtSign],
  async (req: Request, res: Response) => {
  try {
   if(!validationResult(req).isEmpty()){
    return res
    .status(400)
    .send({errors: validationResult(req).array()})
   }
   console.log(req.body , 'sssssssssssssssss');
   const admin = false
   const email = req.body.email
   const password =  req.body.password
   console.log(password , 'hiiii');
   const persons = await findPersonByEmail(email , password)
   console.log(persons, 'person' , password);
   
   persons.map((person) =>{
    console.log(password , person.password , 'password');
    bcrypt.compare(password, person.password).then((mach)=>{
      if(mach === false){
        return  res.status(400).send('טעות בסיסמא')
      }
      res.status(200).send(person)
      
    })
   })
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
})

router.get('/:id', jwtVerify,async (req: Request, res: Response) => {
  try {
    const withRelations = req.query.withRelations === 'true'
    const [customer] = await findPerson(+req.params.id, withRelations)
    customer ? res.send(customer) : res.sendStatus(404)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
})
router.get('/',async (req: Request, res: Response) => {
  try {
    const customer = await findPerson(null, true)
    customer.length ? res.send(customer) : res.sendStatus(404)
  } catch (error) {
    res.sendStatus(500)
  }
})


router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const isUpdated = await updateCustomer(+req.params.id, req.body)
    isUpdated
      ? res.send(`Customer ${req.params.id} is updated`)
      : res.send('Nothing is updated')
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
})

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const isDeleted = await deleteCustomer(+req.params.id)
    isDeleted
      ? res.send(`Customer ${req.params.id} is deleted`)
      : res.send('Nothing is deleted')
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
})


export default router
