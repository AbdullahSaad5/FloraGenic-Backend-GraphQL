import mongoose from "mongoose";
const Schema = mongoose.Schema;

const promoSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
    default: new Date(),
  },
  endDate: {
    type: Date,
    required: true,
    default: new Date(),
  },
});

export const PromoModel = mongoose.model("Promo", promoSchema);
