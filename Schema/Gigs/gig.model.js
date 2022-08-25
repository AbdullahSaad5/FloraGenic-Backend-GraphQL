const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gigSchema = new Schema({
  sellerID: {
    type: Schema.Types.ObjectId,
    ref: "User",
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
  overallRating: {
    type: Number,
    default: 0,
  },
  type: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
  packages: [
    {
      description: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      deliverWithinDays: {
        type: Number,
        required: true,
      },
    },
  ],
  reviews: [
    {
      userId: {
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

module.exports = mongoose.model("Gig", gigSchema);
