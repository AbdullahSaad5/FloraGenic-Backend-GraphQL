import { CartItemModel } from "./db.js";

export const CartItemQuery = {
  cartItems: async (_, args, ctx) => {
    const { user } = ctx;

    if (!user) throw new Error("You are not authenticated!");

    if (user.userType !== "Customer") {
      throw new Error("You are not authorized to perform this operation!");
    }

    const cartItems = await CartItemModel.find({
      userID: user.id,
    });

    return cartItems;
  },
  cartItem: async (_, args, ctx) => {
    const { id } = args;
    const { user } = ctx;

    if (!user) throw new Error("You are not authenticated!");

    if (user.userType !== "Customer") {
      throw new Error("You are not authorized to perform this operation!");
    }

    const cartItem = await CartItemModel.findById({
      _id: id,
      userID: user.id,
    });

    return cartItem;
  },
};
