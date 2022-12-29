import { NurseryModel } from "../Nurseries/db.js";
import { CategoryModel } from "../Category/db.js";
export const ProductResolvers = {
  nursery: async (parent) => {
    const nursery = await NurseryModel.findById(parent.nurseryID);
    return nursery;
  },
  category: async (parent) => {
    const category = await CategoryModel.findById(parent.category);
    return category;
  },
};
