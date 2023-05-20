import { ReviewModel } from "./db.js";
import { ProductModel } from "../Products/db.js";
export const ReviewMutation = {
  reviewCreate: async (parent, args, ctx, info) => {
    const productReviews = await ReviewModel.find({
      productID: args.input.productID,
    });

    const totalReviews = productReviews.length;

    await ProductModel.findOneAndUpdate(
      { _id: args.input.productID },
      {
        $set: {
          overallRating:
            (productReviews.reduce((a, b) => a + b.rating, 0) +
              args.input.rating) /
            (totalReviews + 1),
        },
      },
      { new: true }
    );
    const review = await ReviewModel.create(args.input);
    return review;
  },
  reviewUpdate: async (parent, args, ctx, info) => {
    const { id, input } = args;

    const productReviews = await ReviewModel.find({
      productID: args.input.productID,
    });

    const totalReviews = productReviews.length;

    await ProductModel.findOneAndUpdate(
      { _id: args.input.productID },
      {
        $set: {
          overallRating:
            (productReviews.reduce((a, b) => a + b.rating, 0) +
              args.input.rating) /
            (totalReviews + 1),
        },
      },
      { new: true }
    );
    const review = await ReviewModel.findOneAndUpdate(
      id,
      { $set: input },
      { new: true }
    );
    return review;
  },
  reviewDelete: async (parent, args, ctx, info) => {
    const productReviews = await ReviewModel.find({
      productID: args.input.productID,
    });

    const totalReviews = productReviews.length;
    await ProductModel.findOneAndUpdate(
      { _id: args.input.productID },
      {
        $set: {
          overallRating:
            (productReviews.reduce((a, b) => a + b.rating, 0) -
              args.input.rating) /
            (totalReviews - 1),
        },
      },
      { new: true }
    );
    const review = await ReviewModel.findOneAndDelete({ _id: args.id });
    return review;
  },
};
