import { CartItemModel } from "./db.js";

export const CartItemMutation = {
  cartItemCreate: async (_, args) => {
    const { data } = args;
    const cartItem = await CartItemModel.create(data);
    return cartItem;
  },
  cartItemUpdate: async (_, args) => {
    const { id, quantity } = args;
    const cartItem = await CartItemModel.findByIdAndUpdate(
      id,
      {
        $set: quantity,
      },
      { new: true }
    );
    return cartItem;
  },
  cartItemDelete: async (_, args) => {
    const { id } = args;
    await CartItemModel.findByIdAndDelete(id);
    return "CartItem deleted successfully";
  },
  cartItemDeleteAll: async (_, args) => {
    const { userID } = args;
    await CartItemModel.deleteMany({ userID });
    return "CartItems deleted successfully";
  },
};
