const mongoose = require("mongoose");
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
  price: {
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
  image: {
    type: String,
    required: true,
    default: "",
  },
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
  reviews: [
    {
      userID: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
      },
      likes: {
        type: Number,
        default: 0,
      },
    },
  ],
});

module.exports = mongoose.model("Product", productSchema);
