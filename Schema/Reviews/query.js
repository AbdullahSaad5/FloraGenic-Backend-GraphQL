import { GardenerModel } from "../Gardeners/db.js";
import { NurseryOwnerModel } from "../NurseryOwner/db.js";
import { ReviewModel } from "./db.js";

export const ReviewQuery = {
  reviews: async (parent, args, ctx, info) => {
    const { user } = ctx;

    if (!user) throw new Error("You are not authenticated");
    if (user?.userType !== "NurseryOwner" && user?.userType !== "Gardener")
      throw new Error("You can't view reviews");

    if (user?.userType === "NurseryOwner") {
      const nurseryOwner = await NurseryOwnerModel.findOne({ userID: user.id });
      const reviews = await ReviewModel.find({
        productID: { $in: nurseryOwner.nurseries },
      });
      return reviews;
    } else if (user?.userType === "Gardener") {
      const gardener = await GardenerModel.findOne({ userID: user.id });
      const reviews = await ReviewModel.find({
        productID: gardener._id,
      });
      return reviews;
    } else {
      throw new Error("You can't view reviews");
    }
  },
};
