import { ReviewModel } from "./db.js";

export const ReviewQuery = {
  reviews: async (parent, args, ctx, info) => {
    const reviews = await ReviewModel.find({ productID: args.productID });
    return reviews;
  },
};
