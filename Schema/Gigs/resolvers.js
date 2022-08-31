import { GardenerModel } from "../Gardeners/db.js";
import { ReviewModel } from "../Reviews/db.js";

export const GigResolvers = {
  gardenerDetails: async (root) => {
    const gardener = await GardenerModel.findById(root.gardenerID);
    return gardener;
  },

  reviews: async (root) => {
    const reviews = await ReviewModel.find({ gigID: root.id });
    return reviews;
  },
};
