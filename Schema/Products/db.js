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
  description: {
    type: String,
    required: true,
  },
  category: {
    // type: String,
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  hidden: {
    type: Boolean,
    default: false,
  },
  retailPrice: {
    type: Number,
    required: true,
  },
  wholesalePrice: {
    type: Number,
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
    },
  ],
  overallRating: {
    type: Number,
    default: 0,
  },
  tags: [
    {
      // type: Schema.Types.ObjectId,
      // ref: "Tag",
      type: String,
      required: true,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

productSchema.pre("findOneAndUpdate", function (next) {
  this.update({}, { $set: { updatedAt: new Date() } });
  next();
});

export const ProductModel = mongoose.model("Product", productSchema);
