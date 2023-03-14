import { UserModel } from "../Users/db.js";

export const PaymentResolvers = {
  customerDetails: async (parent) => {
    return await UserModel.findById(parent.userID);
  },
};
