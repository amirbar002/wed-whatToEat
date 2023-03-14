import { NOT_FOUND } from "../constants";
import { Person } from "../entity/Person";
import { Product } from "../entity/Product";
import { findPerson } from "./Person";
import { findProducts } from "./products";
import { Review } from "../entity/Review";

export const findFollowesProductId = async (
  reviewId?: number,
  withRelations = false
): Promise<any[]> => {
  const x = await Review.find({
    ...(reviewId ? { where: { productId: reviewId } } : {}),
    ...(withRelations
      ? {
          relations: {
            Person:false,
            Products: true,
          },
        }
      : {}),
  });
  console.log(x);
  return x;
};

export const findFollowes = async (
  reviewId?: number,
  withRelations = false
): Promise<any[]> => {
  const x = await Review.find({
    ...(reviewId ? { where: { personId: reviewId } } : {}),
    ...(withRelations
      ? {
          relations: {
            Person:false,
            Products: true,
          },
        }
      : {}),
  });
  console.log("x");
  return x;
};



export const createFollowe = async (
  record: Review,
  productIds: number[]
): Promise<Review> => {
  const review = Review.create(record);
  const promises: Promise<Product[]>[] = [];
  console.log("promises");
  console.log(promises);
  for (const productId of productIds) {
    console.log("productId");
    console.log(productId);
    promises.push(findProducts(productId));
  }

  const product = await Promise.all(promises);
  review.Products = product.flat();
  return await review.save();
};



export const deleteFollowe = async (productId: number): Promise<boolean> => {
  const res = await Review.delete(productId)
  return res.affected ? true : false
}


export const updateFollowe = async (orderId: number, data:any): Promise<Review | typeof NOT_FOUND > => {
  const { products: productIds, customer: customerId, ...orderProps} = data
  const [order] = await findFollowes(orderId)

  if(!order){
      return NOT_FOUND
  }

  if(data.customer){
      const [customer] = await findPerson(customerId)

      if(!customer){
          return NOT_FOUND
      }

      order.customer = customer
  }

  if(data.products && data.products.length){
      const promises: Promise<Product[]>[] = []
      for (const productId of productIds) {
        promises.push(findProducts(productId))
      }
    
      const products = await Promise.all(promises)
  
      if(!products.length){
          return NOT_FOUND
      }
      order.products = products.flat()
  }

  for(const key in orderProps){
      order[key] = orderProps[key]
  }

  return await order.save()
}
