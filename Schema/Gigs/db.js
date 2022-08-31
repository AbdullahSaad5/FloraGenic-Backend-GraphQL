import mongoose from "mongoose";
const Schema = mongoose.Schema;

const gigSchema = new Schema({
  gardenerID: {
    type: Schema.Types.ObjectId,
    ref: "Gardener",
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
  type: {
    type: String,
    required: true,
  },
  hidden: {
    type: Boolean,
    default: false,
  },
  overallRating: {
    type: Number,
    default: 0,
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
  packages: [
    {
      name: {
        type: String,
        required: true,
      },
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
});

export const GigModel = mongoose.model("Gig", gigSchema);
