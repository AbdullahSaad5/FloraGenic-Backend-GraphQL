import { NurseryOwnerModel } from "../NurseryOwner/db.js";
import { NurseryReviewModel } from "./db.js";

export const NurseryReviewQuery = {
  nurseryReviews: async (parent, args, ctx, info) => {
    const { user } = ctx;

    if (user?.userType === "NurseryOwner") {
      const nurseryOwner = await NurseryOwnerModel.findOne({ userID: user.id });

      return await NurseryReviewModel.find({
        nurseryID: { $in: nurseryOwner.nurseries },
      });
    } else if (user?.userType === "Admin") {
      return await NurseryReviewModel.find();
    } else {
      if (!args.nurseryID) {
        throw new Error("Nursery ID is required");
      } else {
        return await NurseryReviewModel.find({ nurseryID: args.nurseryID });
      }
    }
  },
};
