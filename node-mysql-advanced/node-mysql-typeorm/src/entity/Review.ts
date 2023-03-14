import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  JoinTable,
  ManyToOne,
  ManyToMany,
} from "typeorm";
import { Product } from "./Product";
import { Person } from "./Person";

@Entity()
export class Review  extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column()
  text: string;
  @Column()
  name: string;

  @Column()
  personId: number;
  
  @Column()
  productId: number;


  @Column()
  rating: number;

  @ManyToOne((type)=> Person , (person)=> person.Product,{
    onDelete: 'CASCADE'
  })
  @JoinTable({name: 'person_id'})
  Person: Person;

  @ManyToMany((type)=> Product , (product)=> product.Person,{
    onDelete: 'CASCADE'
  })
  
  @ManyToMany(() => Product, (product) => product.review)
  @JoinTable({
    name: 'review-products',
    joinColumn: {
      name: 'review_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'product_id',
      referencedColumnName: 'id',
    },
  })
  Products: Product[]
  
}
