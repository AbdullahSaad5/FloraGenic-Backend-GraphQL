import { CartItemModel } from "./db.js";

export const CartItemQuery = {
  cartItems: async (_, args) => {
    const { userID } = args;
    const cartItems = await CartItemModel.find({ userID });
    return cartItems;
  },
  cartItem: async (_, args) => {
    const { id } = args;
    const cartItem = await CartItemModel.findById(id);
    return cartItem;
  },
};
