import { CustomerModel } from "../Customers/db.js";
import { GardenerModel } from "../Gardeners/db.js";
import { GardenerOrderModel } from "./db.js";

export const GardenerOrderQuery = {
  gardenerOrders: async (_, args, ctx) => {
    const { user } = ctx;

    if (!user) {
      throw new Error("You are not authenticated!");
    }

    if (user.userType === "Admin") {
      const gardenerOrders = await GardenerOrderModel.find().sort({
        date: 1,
      });
      return gardenerOrders;
    } else if (user.userType === "Customer") {
      const customer = await CustomerModel.findOne({
        userID: user.id,
      });
      const gardenerOrders = await GardenerOrderModel.find({
        customer: customer.id,
      }).sort({
        date: 1,
      });
      return gardenerOrders;
    } else if (user.userType === "Gardener") {
      const gardener = await GardenerModel.findOne({
        userID: user.id,
      });

      const gardenerOrders = await GardenerOrderModel.find({
        gardener: gardener.id,
      }).sort({
        date: 1,
      });
      return gardenerOrders;
    } else {
      throw new Error("You are not authenticated!");
    }
  },
  gardenerOrder: async (_, args, ctx) => {
    const { user } = ctx;

    if (!user) {
      throw new Error("You are not authenticated!");
    }

    const { id } = args;

    if (user.userType === "Admin") {
      const gardenerOrder = await GardenerOrderModel.findById(id);
      return gardenerOrder;
    } else if (user.userType === "Customer") {
      const gardenerOrder = await GardenerOrderModel.findOne({
        _id: id,
        customer: user.id,
      });
      return gardenerOrder;
    } else if (user.userType === "Gardener") {
      const gardener = await GardenerModel.findById(user.id);
      const gardenerOrder = await GardenerOrderModel.findOne({
        _id: id,
        gardener: gardener.id,
      });
    } else {
      throw new Error("You are not authenticated!");
    }
  },
};
