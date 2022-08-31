import { PaymentModel } from "./db.js";

export const PaymentMutation = {
  paymentCreate: async (parent, args) => {
    const { data } = args;
    const payment = new PaymentModel(data);
    await payment.save();
    return payment;
  },
  paymentUpdate: async (parent, args) => {
    const { id, data } = args;
    const payment = await PaymentModel.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true }
    );
    return payment;
  },
  paymentDelete: async (parent, args) => {
    const { id } = args;
    const payment = await PaymentModel.findByIdAndDelete(id);
    return payment;
  },
};
