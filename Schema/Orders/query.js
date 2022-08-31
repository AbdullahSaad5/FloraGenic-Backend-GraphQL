import { OrderModel } from "./db.js";

export const OrderQuery = {
  orders: async (_, args) => {
    const { customerID, productID } = args.input || {};
    const orders = await OrderModel.find({
      $or: [
        { customerID },
        {
          products: {
            $elemMatch: {
              productID,
            },
          },
        },
      ],
    });
    return orders;
  },
  order: async (_, args) => {
    const { id } = args;
    const order = await OrderModel.findById(id);
    return order;
  },
};
