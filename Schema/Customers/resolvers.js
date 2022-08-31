// product/resolvers.js
import { UserModel } from "../Users/db.js";
import { AddressModel } from "../Addresses/db.js";
import { PaymentModel } from "../Payments/db.js";
export const CustomerResolvers = {
  userDetails: async (parent) => {
    return await UserModel.findById(parent.userID);
  },
  payments: async (parent) => {
    return await PaymentModel.find({ customerID: parent.id });
  },
  addresses: async (parent) => {
    return await AddressModel.find({ customerID: parent.id });
  },
};
