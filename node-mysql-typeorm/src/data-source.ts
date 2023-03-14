import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { RDBMS_MYSQL } from './constants'
import { Review } from './entity/Review'
import { Person } from './entity/Person'
import { Product } from './entity/Product'

export const AppDataSource = new DataSource({
  type: RDBMS_MYSQL,
  host: process.env.MYSQL_HOST,
  port: +process.env.MYSQL_PORT,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB_NAME,
  synchronize: true,
  logging: false,
  entities: [Person, Product,Review], 
  migrations: [],
  subscribers: [],
})
