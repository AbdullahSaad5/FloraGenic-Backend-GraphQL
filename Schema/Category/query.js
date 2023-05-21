import { CategoryModel } from "./db.js";

export const CategoryQuery = {
  categories: async (_, args, ctx) => {
    const { user } = ctx;
    let categories;
    if (user?.userType === "Admin") {
      categories = await CategoryModel.find();
    } else {
      categories = await CategoryModel.find({ hiddenStatus: false });
    }
    return categories;
  },

  category: async (_, args, ctx) => {
    const { id } = args;
    const { user } = ctx;
    let category;
    if (user?.userType === "Admin") {
      category = await CategoryModel.findById(id);
    } else {
      category = await CategoryModel.findOne({ _id: id, hiddenStatus: false });
    }
    return category;
  },
};
