import { LessThan, MoreThanOrEqual } from 'typeorm'
import { Product } from '../entity/Product'
import { Review } from '../entity/Review'

export const createProduct = async (record: Product): Promise<Product> => {
  const product = Product.create(record)
  return await product.save()
}

export const findProducts = async (
  productId?: number,
  withRelations = false
): Promise<Product[]> => {
  return await Product.find({
    ...(productId ? { where: { id: productId } } : {}),
    ...(withRelations
      ? {
          relations: {
          // Review: true,
          },
        }
      : {}),
  })
}

export const updateProduct = async (
  productId: number,
  data: Product
  
): Promise<boolean> => {
  console.log(data, 'data');
  const res = await Product.update(productId, data)
  return res.affected ? true : false
}

export const deleteProduct = async (productId: number): Promise<boolean> => {
  const res = await Product.delete(productId)
  return res.affected ? true : false
}

export const analayzeQuantity = async (
  startProductId: number,
  endProductId: number
): Promise<any> => {
  return await Product.createQueryBuilder('product')
    .select('SUM(product.quantity)', 'total_quantity')
    .addSelect('AVG(product.quantity)', 'average_quantity')
    .addSelect('MAX(product.quantity)', 'max_quantity')
    .addSelect('MIN(product.quantity)', 'min_quantity')
    .addSelect('COUNT(*)', 'count')
    .where('id >= :startId', { startId: startProductId })
    .andWhere('id <= :endId', { endId: endProductId })
    .getRawMany()
}

// export const findProductsByQuantityOrPrice = async (
//   productQuntity: number,
//   productPrice: number
// ): Promise<Product[]> => {
//   return await Product.find({
//     where: [
//       { quantity: MoreThanOrEqual(productQuntity) },
//       { unit_price: LessThan(productPrice), currency: Currency.EUR },
//     ],
//   })
// }
