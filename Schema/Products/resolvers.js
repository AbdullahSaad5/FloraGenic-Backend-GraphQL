import { CategoryModel } from "../Category/db.js";
import { NurseryModel } from "../Nurseries/db.js";
import { ReviewModel } from "../Reviews/db.js";
export const ProductResolvers = {
  nursery: async (parent) => {
    const nursery = await NurseryModel.findById(parent.nurseryID);
    return nursery;
  },
  category: async (parent) => {
    const category = await CategoryModel.findById(parent.category);
    return category;
  },
  reviews: async (parent) => {
    const reviews = await ReviewModel.find({ productID: parent.id });
    return reviews;
  },
};
