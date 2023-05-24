import { NurseryReviewModel } from "./db.js";
import { ProductModel } from "../Products/db.js";
import { GardenerModel } from "../Gardeners/db.js";
import { NurseryModel } from "../Nurseries/db.js";
export const NurseryReviewMutation = {
  nurseryReviewCreate: async (parent, args, ctx, info) => {
    const { user } = ctx;

    if (!user) throw new Error("You are not authenticated!");

    if (user.userType !== "Customer")
      throw new Error("You are not a customer!");

    args.input.userID = user.id;

    const haveReviewed = await NurseryReviewModel.findOne({
      nurseryID: args.input.nurseryID,
      userID: user.id,
    });

    if (haveReviewed) throw new Error("You have already reviewed this nursery");

    const nurseryReviews = await NurseryReviewModel.find({
      nurseryID: args.input.nurseryID,
    });

    const totalReviews = nurseryReviews.length;

    await NurseryModel.findOneAndUpdate(
      { _id: args.input.nurseryID },
      {
        $set: {
          rating:
            (nurseryReviews.reduce((a, b) => a + b.rating, 0) +
              args.input.rating) /
            (totalReviews + 1),
        },
      },
      { new: true }
    );

    const review = await NurseryReviewModel.create(args.input);
    return review;
  },
  nurseryReviewUpdate: async (parent, args, ctx, info) => {
    const { user } = ctx;

    if (!user) throw new Error("You are not authenticated!");

    if (user.userType !== "Customer")
      throw new Error("You are not a customer!");

    const { id, input } = args;

    const haveReviewed = await NurseryReviewModel.findOne({
      _id: id,
      userID: user.id,
    });

    if (!haveReviewed) throw new Error("You have not reviewed this product");

    const nurseryReviews = await NurseryReviewModel.find({
      nurseryID: args.input.nurseryID,
    });

    const totalReviews = nurseryReviews.length;

    await NurseryModel.findOneAndUpdate(
      { _id: args.input.nurseryID },
      {
        $set: {
          rating:
            (nurseryReviews.reduce((a, b) => a + b.rating, 0) +
              args.input.rating) /
            (totalReviews + 1),
        },
      },
      { new: true }
    );
    const review = await NurseryReviewModel.findOneAndUpdate(
      id,
      { $set: input },
      { new: true }
    );
    return review;
  },
  nurseryReviewDelete: async (parent, args, ctx, info) => {
    const { user } = ctx;

    if (!user) throw new Error("You are not authenticated!");

    if (user.userType !== "Customer")
      throw new Error("You are not a customer!");

    const haveReviewed = await NurseryReviewModel.findOne({
      _id: id,
      userID: user.id,
    });

    if (!haveReviewed) throw new Error("You have not reviewed this product");

    const nurseryReviews = await NurseryReviewModel.find({
      nurseryID: args.input.nurseryID,
    });

    const totalReviews = nurseryReviews.length;

    if (totalReviews === 1) {
      await NurseryModel.findOneAndUpdate(
        { _id: args.input.productID },
        {
          $set: {
            rating: 0,
          },
        },
        { new: true }
      );
    } else {
      await NurseryModel.findOneAndUpdate(
        { _id: args.input.productID },
        {
          $set: {
            rating:
              (nurseryReviews.reduce((a, b) => a + b.rating, 0) -
                args.input.rating) /
              (totalReviews - 1),
          },
        },
        { new: true }
      );
    }
    const review = await ReviewModel.findOneAndDelete({ _id: args.id });
    return review;
  },
};
