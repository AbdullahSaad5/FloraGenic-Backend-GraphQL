import { CustomerModel } from "../Customers/db.js";

export const PaymentResolvers = {
  customerDetails : async (parent) => {
    return await UserModel.findById(parent.userID);
  },
};
