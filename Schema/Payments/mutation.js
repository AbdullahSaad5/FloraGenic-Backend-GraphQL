import { AuthenticationError } from "apollo-server-core";
import { PaymentModel } from "./db.js";

export const PaymentMutation = {
  paymentCreate: async (parent, args, context) => {
    const { data } = args;

    const { user } = context;

    if (!user) throw new AuthenticationError("You are not authenticated");

    const payment = new PaymentModel({
      ...data,
      userID: user.id,
    });

    await payment.save();
    return payment;
  },
  paymentUpdate: async (parent, args, context) => {
    const { id, data } = args;
    const { user } = context;
    if (!user) throw new AuthenticationError("You are not authenticated");
    const payment = await PaymentModel.findOneAndUpdate(
      { _id: id, userID: user.id },
      { $set: data },
      { new: true }
    );
    return payment;
  },
  paymentDelete: async (parent, args, context) => {
    const { id } = args;
    const { user } = context;
    if (!user) throw new AuthenticationError("You are not authenticated");
    const payment = await PaymentModel.findOneAndDelete({
      _id: id,
      userID: user.id,
    });
    return payment;
  },
};
