import mongoose from "mongoose";
const Schema = mongoose.Schema;

const nurseryReviewSchema = new Schema({
  userID: {
    type: String,
    required: true,
    ref: "User",
  },
  nurseryID: {
    type: String,
    required: true,
    ref: "Nursery",
  },
  rating: {
    type: Number,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
    immutable: true,
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

nurseryReviewSchema.pre("findOneAndUpdate", function (next) {
  this.update({}, { $set: { updatedAt: new Date() } });
  next();
});

export const NurseryReviewModel = mongoose.model(
  "NurseryReview",
  nurseryReviewSchema
);
