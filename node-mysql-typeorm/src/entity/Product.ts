import { Column, Entity, BaseEntity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm'
import { Review } from './Review'
import { Person } from './Person'

@Entity('products')
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  img : string
  
  @Column()
  Card_Title : string

  @Column()
  text: string

  @Column()
  category: number

  @Column()
  district: number

  @Column()
  location: string

  @ManyToMany(() => Person)
    @JoinTable({
        name: 'product_person'
      })
    Person: Person[]

    @ManyToMany((type)=>Review , (review)=> review,{
      onDelete: 'CASCADE'
    })
    @JoinTable()
    review: Review[];
}
