import { CustomerModel } from "../Customers/db.js";
import { GardenerOrderModel } from "./db.js";

export const GardenerOrderMutation = {
  gardenerOrderCreate: async (_, args, ctx) => {
    const { user } = ctx;
    if (!user) {
      throw new Error("You are not authenticated!");
    }

    if (user.userType === "Admin") {
      if (!args.data.customer) {
        throw new Error("You must provide a customer");
      }
    }

    if (user.userType === "Customer") {
      const customer = await CustomerModel.findById(user.id);
      args.data.customer = customer.id;
    }

    const { data } = args;
    const gardenerOrder = await GardenerOrderModel.create(data);
    return gardenerOrder;
  },
};
