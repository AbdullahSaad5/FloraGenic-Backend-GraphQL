import { ProductModel } from "./db.js";

export const ProductMutation = {
  productCreate: async (parent, args) => {
    const { data } = args;
    const product = await ProductModel.create(data);
    return product;
  },
  productUpdate: async (parent, args) => {
    const { id, data } = args;
    const product = await ProductModel.findByIdAndUpdate(
      id,
      {
        $set: data,
      },
      {
        new: true,
      }
    );
    return product;
  },
  productDelete: async (parent, args) => {
    const { id } = args;
    const product = await ProductModel.findByIdAndDelete(id);
    return "Product deleted";
  },
  productHide: async (parent, args) => {
    const { id } = args;
    const product = await ProductModel.findByIdAndUpdate(
      id,
      {
        $set: { hidden: true },
      },
      {
        new: true,
      }
    );
    return "Product hidden";
  },
};