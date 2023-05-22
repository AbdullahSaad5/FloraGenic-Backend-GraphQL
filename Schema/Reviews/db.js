import mongoose from "mongoose";
const Schema = mongoose.Schema;

import { ProductModel } from "../Products/db.js";
import { GardenerModel } from "../Gardeners/db.js";
import { NurseryModel } from "../Nurseries/db.js";

const reviewSchema = new Schema({
  userID: {
    type: String,
    required: true,
  },
  productID: {
    type: String,
    required: true,
  },
  productType: {
    type: String,
    required: true,
    default: "Product",
    enum: ["Product", "Gardener", "Nursery"],
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

reviewSchema.pre("findOneAndUpdate", function (next) {
  this.update({}, { $set: { updatedAt: new Date() } });
  next();
});

reviewSchema.pre("save", function (next) {
  const review = this;
  if (review.productType === "Product") {
    ProductModel.findById(review.productID).then(async (product) => {
      const allReviews = await ReviewModel.find({ productID: product._id });
      product.overallRating =
        product.overallRating * (allReviews.length - 1) + review.rating;
      product.overallRating /= allReviews.length;
    });
  } else if (review.productType === "Gardener") {
    GardenerModel.findById(review.productID).then(async (gardener) => {
      const allReviews = await ReviewModel.find({ productID: gardener._id });
      gardener.overallRating =
        gardener.overallRating * (allReviews.length - 1) + review.rating;
      gardener.overallRating /= allReviews.length;
    });
  } else if (review.productType === "Nursery") {
    NurseryModel.findById(review.productID).then(async (nursery) => {
      const allReviews = await ReviewModel.find({ productID: nursery._id });
      nursery.overallRating =
        nursery.overallRating * (allReviews.length - 1) + review.rating;
      nursery.overallRating /= allReviews.length;
    });
  }
  next();
});

reviewSchema.pre("deleteOne", function (next) {
  const review = this;
  if (review.productType === "Product") {
    ProductModel.findById(review.productID).then(async (product) => {
      const allReviews = await ReviewModel.find({ productID: product._id });
      product.overallRating =
        product.overallRating * allReviews.length - review.rating;
      product.overallRating /= allReviews.length - 1;
    });
  } else if (review.productType === "Gardener") {
    GardenerModel.findById(review.productID).then(async (gardener) => {
      const allReviews = await ReviewModel.find({ productID: gardener._id });
      product.overallRating =
        product.overallRating * allReviews.length - review.rating;
      product.overallRating /= allReviews.length - 1;
    });
  } else if (review.productType === "Nursery") {
    NurseryModel.findById(review.productID).then(async (nursery) => {
      const allReviews = await ReviewModel.find({ productID: nursery._id });
      product.overallRating =
        product.overallRating * allReviews.length - review.rating;
      product.overallRating /= allReviews.length - 1;
    });
  }
  next();
});

export const ReviewModel = mongoose.model("Review", reviewSchema);
