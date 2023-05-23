import e from "cors";
import { ProductModel } from "../Products/db.js";
import { CartItemModel } from "./db.js";

export const CartItemMutation = {
  cartItemCreate: async (_, args, ctx) => {
    const { data } = args;
    const { user } = ctx;

    if (!user) throw new Error("You are not authenticated!");

    if (user.userType !== "Customer") {
      throw new Error("You are not authorized to perform this operation!");
    }

    const product = await ProductModel.findById(data.productID);


    if (!product) throw new Error("Product not found!!!!!!");

    if (product.stock < data.quantity)
      throw new Error(`Only ${product.stock} items left in stock!`);

    const alreadyInCart = await CartItemModel.findOne({
      productID: data.productID,
      userID: user.id,
    });

    if (alreadyInCart) {
      if (product.stock < alreadyInCart.quantity + data.quantity) {
        throw new Error(
          `Only ${product.stock} items left in stock!` +
            ` You already have ${alreadyInCart.quantity} items in your cart!`
        );
      } else {
        await CartItemModel.findOneAndUpdate(
          { productID: data.productID, userID: user.id },
          {
            $inc: { quantity: data.quantity },
          },
          { new: true }
        );
        return await CartItemModel.find({
          userID: user.id,
        });
      }
    }

    const cartItem = await CartItemModel.create({ ...data, userID: user.id });
    return await CartItemModel.find({
      userID: user.id,
    });
  },
  cartItemUpdate: async (_, args, ctx) => {
    const { user } = ctx;

    if (!user) throw new Error("You are not authenticated!");

    if (user.userType !== "Customer") {
      throw new Error("You are not authorized to perform this operation!");
    }

    const { id, quantity } = args;

    const alreadyInCart = await CartItemModel.findOne({
      _id: id,
      userID: user.id,
    });

    if (!alreadyInCart) throw new Error("Cart Item not found!");

    const product = await ProductModel.findById(alreadyInCart.productID);

    if (!product) throw new Error("Product not found!");

    if (product.stock < quantity)
      throw new Error(`Only ${product.stock} items left in stock!`);

    if (product.stock < quantity + alreadyInCart.quantity)
      throw new Error(
        `Only ${product.stock} items left in stock!` +
          ` You already have ${alreadyInCart.quantity} items in your cart!`
      );

    if (alreadyInCart.quantity + quantity === 0) {
      await CartItemModel.findOneAndDelete({
        _id: id,
        userID: user.id,
      });
      return await CartItemModel.find({
        userID: user.id,
      });
    }

    const cartItem = await CartItemModel.findOneAndUpdate(
      { _id: id, userID: user.id },
      {
        $inc: { quantity: data.quantity },
      },
      { new: true }
    );
    return await CartItemModel.find({
      userID: user.id,
    });
  },
  cartItemDelete: async (_, args, ctx) => {
    const { id } = args;

    const { user } = ctx;

    if (!user) throw new Error("You are not authenticated!");

    if (user.userType !== "Customer") {
      throw new Error("You are not authorized to perform this operation!");
    }

    const deleted = await CartItemModel.findOneAndDelete({
      _id: id,
      userID: user.id,
    });

    if (!deleted) throw new Error("Cart Item not found!");

    return await CartItemModel.find({
      userID: user.id,
    });
  },
  cartItemDeleteAll: async (_, args, ctx) => {
    const { user } = ctx;

    if (!user) throw new Error("You are not authenticated!");

    if (user.userType !== "Customer") {
      throw new Error("You are not authorized to perform this operation!");
    }
    await CartItemModel.deleteMany({ userID: user.id });

    return "CartItems deleted successfully";
  },
};
