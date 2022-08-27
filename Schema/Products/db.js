import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productSchema = new Schema({
  nurseryID: {
    type: Schema.Types.ObjectId,
    ref: "Nursery",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  retailPrice: {
    type: Number,
    required: true,
  },
  wholesalePrice: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  sold: {
    type: Number,
    default: 0,
  },
  images: [
    {
      type: String,
      required: true,
      default: "",
    },
  ],
  overallRating: {
    type: Number,
    default: 0,
  },
  tags: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tag",
      required: true,
    },
  ],
});

export const ProductModel = mongoose.model("Product", productSchema);
