import { CartItemModel } from "../CartItems/db.js";
import { OrderModel } from "./db.js";

export const OrderMutation = {
  orderCreate: async (_, args, ctx) => {
    const { user } = ctx;

    if (!user) throw new Error("You need to login to place an order");

    if (user?.userType === "Admin" && !args.input.customerID) {
      throw new Error("You need to provide customerID");
    }

    if (user?.userType === "Customer") {
      args.input.customerID = user.id;
    }

    const cartItems = await CartItemModel.find({
      userID: args.input.customerID,
    });

    const { input } = args;

    input.products = cartItems.map((item) => ({
      productID: item.productID,
      quantity: item.quantity,
      status: "Pending",
    }));

    const order = await OrderModel.create(input);
    await order.save();

    await CartItemModel.deleteMany({ userID: args.input.customerID });

    return "Order Placed Successfully";
  },
  orderUpdate: async (_, args) => {
    const { id, input } = args;
    await OrderModel.findByIdAndUpdate(id, { $set: input });
    return "Order Updated Successfully";
  },

  orderDelete: async (_, args) => {
    const { id } = args;
    await OrderModel.findByIdAndDelete(id);
    return "Order Deleted Successfully";
  },
};
