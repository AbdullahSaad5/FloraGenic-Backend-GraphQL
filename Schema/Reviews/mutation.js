import { ReviewModel } from "./db.js";
import { ProductModel } from "../Products/db.js";
import { GardenerModel } from "../Gardeners/db.js";
export const ReviewMutation = {
  reviewCreate: async (parent, args, ctx, info) => {
    const { user } = ctx;

    if (!user) throw new Error("You are not authenticated!");

    if (user.userType !== "Customer")
      throw new Error("You are not a customer!");

    args.input.userID = user.id;

    const haveReviewed = await ReviewModel.findOne({
      productID: args.input.productID,
      userID: user.id,
    });

    if (haveReviewed) throw new Error("You have already reviewed this product");

    const productReviews = await ReviewModel.find({
      productID: args.input.productID,
    });

    const totalReviews = productReviews.length;

    if (args.productType === "Gardener") {
      await GardenerModel.findOneAndUpdate(
        { _id: args.input.productID },
        {
          $set: {
            rating:
              (productReviews.reduce((a, b) => a + b.rating, 0) +
                args.input.rating) /
              (totalReviews + 1),
          },
        },
        { new: true }
      );
    } else if (args.productType === "Nursery") {
      await NurseryModel.findOneAndUpdate(
        { _id: args.input.productID },
        {
          $set: {
            rating:
              (productReviews.reduce((a, b) => a + b.rating, 0) +
                args.input.rating) /
              (totalReviews + 1),
          },
        },
        { new: true }
      );
    } else {
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
    }
    const review = await ReviewModel.create(args.input);
    return review;
  },
  reviewUpdate: async (parent, args, ctx, info) => {
    const { user } = ctx;

    if (!user) throw new Error("You are not authenticated!");

    if (user.userType !== "Customer")
      throw new Error("You are not a customer!");

    const { id, input } = args;

    const haveReviewed = await ReviewModel.findOne({
      _id: id,
      userID: user.id,
    });

    if (!haveReviewed) throw new Error("You have not reviewed this product");

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
    const { user } = ctx;

    if (!user) throw new Error("You are not authenticated!");

    if (user.userType !== "Customer")
      throw new Error("You are not a customer!");

    const haveReviewed = await ReviewModel.findOne({
      _id: id,
      userID: user.id,
    });

    if (!haveReviewed) throw new Error("You have not reviewed this product");

    const productReviews = await ReviewModel.find({
      productID: args.input.productID,
    });

    const totalReviews = productReviews.length;

    if (totalReviews === 1) {
      await ProductModel.findOneAndUpdate(
        { _id: args.input.productID },
        {
          $set: {
            overallRating: 0,
          },
        },
        { new: true }
      );
    } else {
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
    }
    const review = await ReviewModel.findOneAndDelete({ _id: args.id });
    return review;
  },
};
