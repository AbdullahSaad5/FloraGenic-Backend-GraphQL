import { AuthenticationError } from "apollo-server-core";
import { PaymentModel } from "./db.js";

export const PaymentQuery = {
  payments: async (parent, args, context) => {
    const { user } = context;

    if (!user) throw new AuthenticationError("You are not authenticated");

    const { id: userID } = user;
    return await PaymentModel.find({ userID });
  },
  payment: async (parent, args, context) => {
    const { user } = context;
    if (!user) throw new AuthenticationError("You are not authenticated");
    return await PaymentModel.findById({ id: args.id, userID: user.id });
  },
};
