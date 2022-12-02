import { CategoryModel } from "./db.js";

export const CartItemMutation = {
  categoryCreate: async (_, args) => {
    const { data } = args;
    const category = await CategoryModel.create(data);
    return category;
  },

  categoryUpdate: async (_, args) => {
    const { id, data } = args;
    const category = await CategoryModel.findByIdAndUpdate(
      id,
      {
        $set: data,
      },
      { new: true }
    );
    return category;
  },

  categoryDelete: async (_, args) => {
    const { id } = args;
    await CategoryModel.findByIdAndDelete(id);
    return "Category deleted successfully";
  },
};
