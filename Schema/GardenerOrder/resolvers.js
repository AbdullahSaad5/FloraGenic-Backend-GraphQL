// product/resolvers.js
import { CustomerModel } from "../Customers/db.js";
import { GardenerModel } from "../Gardeners/db.js";
export const GardenerOrderResolvers = {
  customer: async (parent, args, ctx) => {
    const { customer } = parent;
    const customerData = await CustomerModel.findOne({
      userID: customer,
    });
    return customerData;
  },
  gardener: async (parent, args, ctx) => {
    const { gardener } = parent;
    const gardenerData = await GardenerModel.findOne({
      userID: gardener,
    });
    return gardenerData;
  },
};
