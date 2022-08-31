import { ReviewModel } from "./db.js";

export const ReviewMutation = {
  reviewCreate: async (parent, args, ctx, info) => {
    const review = await ReviewModel.create(args.input);
    return review;
  },
  reviewUpdate: async (parent, args, ctx, info) => {
    const { id, input } = args;
    const review = await ReviewModel.findOneAndUpdate(
      id,
      { $set: input },
      { new: true }
    );
    return review;
  },
  reviewDelete: async (parent, args, ctx, info) => {
    const review = await ReviewModel.findOneAndDelete({ _id: args.id });
    return review;
  },
};
