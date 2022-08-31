import { CustomerModel } from "../Customers/db.js";
import { ProductModel } from "../Products/db.js";

export const ReviewResolvers = {
  customerDetails: async (parent, args, ctx, info) => {
    const customer = await CustomerModel.findById(parent.userID);
    return customer;
  },
  productDetails: async (parent, args, ctx, info) => {
    const product = await ProductModel.findById(parent.productID);
    return product;
  },
};
