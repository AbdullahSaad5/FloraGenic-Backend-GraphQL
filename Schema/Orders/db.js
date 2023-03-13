import mongoose from "mongoose";
import { ProductModel } from "../Products/db.js";
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
    default: new Date(),
    immutable: true,
  },
  shipmentDate: {
    type: Date,
    default: null,
  },
  receivedDate: {
    type: Date,
    default: null,
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

orderSchema.pre("validate", async function (next) {
  this.totalPrice = 0;
  for (let i = 0; i < this.products.length; i++) {
    const product = await ProductModel.findById(this.products[i].productID);
    this.totalPrice += product.retailPrice * this.products[i].quantity;
  }

  this.totalPriceAfterDiscount =
    this.totalPrice - (this.totalPrice * this.discount) / 100;

  next();
});

export const OrderModel = mongoose.model("Order", orderSchema);
