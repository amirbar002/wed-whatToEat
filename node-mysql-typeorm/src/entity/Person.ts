import { Entity, PrimaryGeneratedColumn, Column, BaseEntity , ManyToMany ,  JoinTable } from "typeorm"
import { Product } from "./Product"

@Entity()
export class Person extends BaseEntity {

  @PrimaryGeneratedColumn('increment')
  public id: number;

    @Column()
    email: string

    @Column()
    password: string

    @ManyToMany(() => Product)
    @JoinTable({
        name: 'person_product'
      })
    Product: Product[]

}

