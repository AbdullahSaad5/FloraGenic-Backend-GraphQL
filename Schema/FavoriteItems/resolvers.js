import { CustomerModel } from "../Customers/db.js";
import { ProductModel } from "../Products/db.js";

export const FavoriteItemResolvers = {
  customerDetails: async (item) => {
    return await CustomerModel.findById(item.userID);
  },
  productDetails: async (item) => {
    return await ProductModel.findById(item.productID);
  },
};
