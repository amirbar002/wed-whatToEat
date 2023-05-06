import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { RDBMS_MYSQL } from './constants'
import { Review } from './entity/Review'
import { Person } from './entity/Person'
import { Product } from './entity/Product'

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'eu-cdbr-west-03.cleardb.net',
  port: +3306,
  username: 'badf1974e9747a',
  password: '49e13abe',
  database:'heroku_a5eeed9315caf50',
  synchronize: true,
  logging: false,
  entities: [Person, Product,Review], 
  migrations: [],
  subscribers: [],
})
