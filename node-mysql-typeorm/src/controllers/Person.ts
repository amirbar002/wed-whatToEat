import {  Person } from '../entity/Person'

export const createPerson = async (record: Person): Promise<Person> => {
  const person = Person.create(record)
  console.log('tast');
  return await person.save()
}

export const findPerson = async (
  personId ?: number,
  withRelations = false 
): Promise<Person[]> => {
  const x = 
   await Person.find({
    ...(personId  ? { where: { id: personId } } : {}),
    ...(withRelations
      ? {
          relations: {
            Product: true,
          },
        }
      : {}),
  })
  console.log(x);
  
  return x
}

export const findPersonByEmail = async(
  email: string, 
  password: string, //מוצפן
  withRelations = false
  ): Promise<Person[]> => {
  const persons = await Person.find({
    where: { email: email},
    ...(withRelations
      ? {
          relations: {
            Product: true,
          },
        }
      : {}),
  });
  console.log([persons], 'lll');
  
  return persons 
  
  
}

export const updateCustomer = async (
  customerId: number,
  data: Person
): Promise<boolean> => {
  const res = await Person.update(customerId, data)
  return res.affected ? true : false
}

export const deleteCustomer = async (customerId: number): Promise<boolean> => {
  const res = await Person.delete(customerId)
  return res.affected ? true : false
}

// SELECT first_name, last_name, name as product_name FROM
// customers c
// join orders o on o.customer_id = c.id
// join `orders-products` op on o.id = op.order_id
// join products p on p.id = op.product_id
// where is_paid = true
// export const findCustomerOrdersProductsByPaidStatus = async (
//   customerId: number,
//   isPaid: boolean
// ): Promise<Person[]> => {
//   return await Person.find({
//     select: {
//       first_name: true,
//       email: true,
//       points: true,
//       orders: {
//         order_date: true,
//         status: true,
//         is_paid: true,
//         products: {
//           name: true,
//           quantity: true,
//           unit_price: true,
//           currency: true,
//         },
//       },
//     },
//     where: {
//       id: customerId,
//       orders: { is_paid: isPaid },
//     },
//     relations: { orders: { products: true } },
//   })
// }
