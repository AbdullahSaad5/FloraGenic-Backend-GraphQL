import mongoose from "mongoose";
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  customerID: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: [
    {
      productID: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  totalPriceAfterDiscount: {
    type: Number,
    required: true,
  },
  shippingAddress: {
    type: String,
    required: true,
  },
  orderingDate: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
  shipmentDate: {
    type: Date,
    default: null,
    required: true,
  },
  receivedDate: {
    type: Date,
    default: null,
    default: Date.now,
  },
  paymentID: {
    type: Schema.Types.ObjectId,
    ref: "Payment",
    required: true,
  },
  paymentStatus: {
    type: String,
    required: true,
    default: "Pending",
  },
  orderStatus: {
    type: String,
    required: true,
    default: "Pending",
  },
});

orderSchema.pre("save", function (next) {
  this.totalPriceAfterDiscount =
    this.totalPrice - (this.totalPrice * this.discount) / 100;
  next();
});

export const OrderModel = mongoose.model("Order", orderSchema);
