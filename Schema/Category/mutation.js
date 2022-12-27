import { CategoryModel } from "./db.js";

export const CategoryMutation = {
  categoryCreate: async (_, args) => {
    const { data } = args;
    const category = await CategoryModel.create(data);
    return category;
  },

  categoryUpdate: async (_, args) => {
    const { id, data } = args;
    await CategoryModel.findByIdAndUpdate(id, {
      $set: data,
    });
    return "Category updated successfully";
  },

  categoryDelete: async (_, args) => {
    const { id } = args;
    await CategoryModel.findByIdAndDelete(id);
    return "Category deleted successfully";
  },
};
