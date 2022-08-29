import { ProductModel } from "./db.js";
export const ProductQuery = {
  products: async (parent, args) => {
    const query = {};
    if (args.data) {
      const { name, description, category } = args.data;
      if (name) {
        query.$or = [
          { name: { $regex: name, $options: "i" } },
          { description: { $regex: name, $options: "i" } },
        ];
      }

      if (category) {
        query.category = { $regex: category, $options: "i" };
      }
    }
    console.log(query);
    const products = await ProductModel.find(query).sort({ name: 1 });
    return products;
  },
  product: async (parent, args) => {
    const { id } = args;
    const product = await ProductModel.findById(id);
    return product;
  },
};
