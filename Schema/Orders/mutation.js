import { OrderModel } from "./db.js";

export const OrderMutation = {
  orderCreate: async (_, args) => {
    const { input } = args;
    const order = await OrderModel.create(input);
    return order;
  },
  orderUpdate: async (_, args) => {
    const { id, input } = args;
    const order = await OrderModel.findByIdAndUpdate(
      id,
      { $set: input },
      { new: true }
    );
    return order;
  },

  orderDelete: async (_, args) => {
    const { id } = args;
    const order = await OrderModel.findByIdAndDelete(id);
    return order;
  },
};
