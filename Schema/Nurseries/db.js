import mongoose from "mongoose";
const Schema = mongoose.Schema;

const nurserySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  openingHours: {
    type: String,
    required: true,
  },
  closingHours: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  contactNumber: {
    type: String,
    default: "",
  },
  emailAddress: {
    type: String,
    default: "",
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
});

export const NurseryModel = mongoose.model("Nursery", nurserySchema);
