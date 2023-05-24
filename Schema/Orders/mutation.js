import { CartItemModel } from "../CartItems/db.js";
import { OrderModel } from "./db.js";
import { ProductModel } from "../Products/db.js";
import { CustomerModel } from "../Customers/db.js";

export const OrderMutation = {
  orderCreate: async (_, args, ctx) => {
    const { user } = ctx;

    if (!user) throw new Error("You need to login to place an order");

    if (user?.userType === "Admin" && !args.input.customerID) {
      throw new Error("You need to provide customerID");
    }

    if (user?.userType === "Admin" && args.input.customerID) {
      const customer = await CustomerModel.findById(args.input.customerID);
      if (!customer) throw new Error("Customer not found");
    }

    if (user?.userType === "Customer") {
      const customerID = await CustomerModel.findOne({ userID: user.id });
      args.input.customerID = customerID._id;
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

    // Decrease the quantity of the product
    const promises = input.products.map(async (item) => {
      const product = await ProductModel.findById(item.productID);
      product.stock -= item.quantity;
      product.sold += item.quantity;
      return product.save();
    });

    await Promise.all(promises);

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
