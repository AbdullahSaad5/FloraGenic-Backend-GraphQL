import mongoose from "mongoose";
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
  cardHolderName: {
    type: String,
    required: true,
  },
  cardNumber: {
    type: String,
    required: true,
    unique: true,
  },
  cardType: {
    type: String,
    required: true,
  },
  cardExpiryDate: {
    type: String,
    required: true,
  },
  cardCVV: {
    type: String,
    required: true,
  },
  customer: {
    type: Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
});

export const PaymentModel = mongoose.model("Payment", paymentSchema);
