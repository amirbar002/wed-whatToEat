import { body, ValidationChain } from 'express-validator'

const validator: ValidationChain[] = [
  body('email').isEmail().withMessage('Invalid email'),
]

const registerValidator = [
  ...validator,
  body('username').notEmpty().withMessage('Username is required'),
  body('role').isIn(['cto', 'admin', 'member']).withMessage('Invalid role'),
]

export { registerValidator, validator as loginValidator }
