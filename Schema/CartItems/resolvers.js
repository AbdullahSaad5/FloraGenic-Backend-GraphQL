import { ProductModel } from "../Products/db.js";
import { CustomerModel } from "../Customers/db.js";
export const CartItemResolvers = {
  productDetails: async (cartItem) => {
    const product = await ProductModel.findById(cartItem.productID);
    return product;
  },
  customerDetails: async (cartItem) => {
    const customer = await CustomerModel.findById(cartItem.userID);
    return customer;
  },
  totalPrice: async (cartItem) => {
    const product = await ProductModel.findById(cartItem.productID);
    return product.retailPrice * cartItem.quantity;
  },
};
