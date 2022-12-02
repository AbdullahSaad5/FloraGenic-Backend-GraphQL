import { CategoryModel } from "./db.js";

export const CartItemQuery = {
  categories: async () => {
    const categories = await CategoryModel.find();
    return categories;
  },

  category: async (_, args) => {
    const { id } = args;
    const category = await CategoryModel.findById(id);
    return category;
  },
};
