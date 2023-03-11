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
  blockedStatus: {
    type: Boolean,
    default: false,
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
  phoneNumber: {
    type: String,
  },
  email: {
    type: String,
  },
  website: {
    type: String,
  },
  images: [
    {
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

nurserySchema.pre("findOneAndUpdate", function (next) {
  this.update({}, { $set: { updatedAt: new Date() } });
  next();
});

export const NurseryModel = mongoose.model("Nursery", nurserySchema);
