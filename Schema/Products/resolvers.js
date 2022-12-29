import { NurseryModel } from "../Nurseries/db.js";
export const ProductResolvers = {
  nursery: async (parent) => {
    const nursery = await NurseryModel.findById(parent.nurseryID);
    return nursery;
  },
};
