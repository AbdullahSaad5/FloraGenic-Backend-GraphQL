import { OrderModel } from "./db.js";

export const OrderMutation = {
  orderCreate: async (_, args) => {
    const { input } = args;
    const order = await OrderModel.create(input);
    order.save();
    return order;
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
