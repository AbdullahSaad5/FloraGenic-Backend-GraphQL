import { PaymentModel } from "./db.js";

export const PaymentQuery = {
  payments: async (parent, args, context) => {
    return await PaymentModel.find({ customerID: args.customerID });
  },
  payment: async (parent, args, context) => {
    return await PaymentModel.findById(args.id);
  },
};
