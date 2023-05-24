import { NurseryOwnerModel } from "../NurseryOwner/db.js";
import { OrderModel } from "./db.js";
import { ProductModel } from "../Products/db.js";

export const OrderQuery = {
  orders: async (_, args, ctx) => {
    const userType = ctx?.user?.userType;

    if (!userType) throw new Error("You are not authenticated");

    let orders;
    if (userType === "Customer") {
      orders = await OrderModel.find({ customerID: ctx?.user?.id });
    } else if (userType === "NurseryOwner") {
      const nurseryOwner = await NurseryOwnerModel.findOne({
        userID: ctx?.user?.id,
      });

      const nurseryIDs = nurseryOwner.nurseries; // Get the nursery IDs owned by the nursery owner

      orders = await OrderModel.find({
        products: {
          $elemMatch: {
            nurseryID: { $in: nurseryIDs },
          },
        },
      });
    } else {
      orders = await OrderModel.find();
    }
    return orders;
  },
  order: async (_, args) => {
    const { id } = args;

    const userType = ctx?.user?.userType;

    if (!userType) throw new Error("You are not authenticated");
    let order;
    if (userType === "Customer") {
      order = await OrderModel.findOne({
        _id: id,
        customerID: ctx?.user?.id,
      });
      return order;
    } else if (userType === "NurseryOwner") {
      const nurseryOwner = await NurseryOwnerModel.findOne({
        userID: ctx?.user?.id,
      });
      order = await OrderModel.findOne({
        _id: id,
        "products.nurseryID": { $in: nurseryOwner.nurseries },
      });
    } else {
      order = await OrderModel.findById(id);
    }
    return order;
  },
};
