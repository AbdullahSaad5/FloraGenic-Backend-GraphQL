import { OrderModel } from "./db.js";

export const OrderQuery = {
  orders: async (_, args, ctx) => {
    // const { customerID, productID } = args?.input;
    // const orders = await OrderModel.find({
    //   $or: [
    //     { customerID },
    //     {
    //       products: {
    //         $elemMatch: {
    //           productID,
    //         },
    //       },
    //     },
    //   ],
    // });

    const userType = ctx?.user?.userType;

    if (!userType) throw new Error("You are not authenticated");

    let orders = [];
    if (userType === "Customer") {
      orders = await OrderModel.find({ customerID: ctx?.user?.id });
    } else {
      orders = await OrderModel.find();
    }
    return orders;
  },
  order: async (_, args) => {
    const { id } = args;

    const userType = ctx?.user?.userType;

    if (!userType) throw new Error("You are not authenticated");

    if (userType === "Customer") {
      const order = await OrderModel.findOne({
        _id: id,
        customerID: ctx?.user?.id,
      });
      return order;
    }

    const order = await OrderModel.findById(id);
    return order;
  },
};
