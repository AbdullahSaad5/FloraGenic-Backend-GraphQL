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
      status: {
        type: String,
        required: true,
        default: "Pending",
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  totalPriceAfterDiscount: {
    type: Number,
    required: true,
  },
  shippingAddress: {
    type: Schema.Types.ObjectId,
    ref: "Address",
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
  paymentType: {
    type: String,
    required: true,
    enum: ["Stripe", "COD"],
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
