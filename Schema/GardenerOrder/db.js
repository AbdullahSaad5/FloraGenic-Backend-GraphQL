import mongoose from "mongoose";

const gardenerOrderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  gardener: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Gardener",
    required: true,
  },
  service: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  requestedTime: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
    enum: ["Hours", "Days"],
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "completed", "cancelled"],
    default: "pending",
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

export const GardenerOrderModel = mongoose.model(
  "GardenerOder",
  gardenerOrderSchema
);
