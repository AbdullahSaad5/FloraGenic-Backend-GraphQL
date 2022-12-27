import { CategoryModel } from "./db.js";

export const CategoryQuery = {
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
