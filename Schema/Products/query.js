import { NurseryModel } from "../Nurseries/db.js";
import { ProductModel } from "./db.js";
export const ProductQuery = {
  products: async (parent, args, context) => {
    const query = {};
    const userType = context.userType || "Customer";
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
    if (userType === "NurseryOwner") {
      const nursery = await NurseryModel.findOne({ owner: context.user._id });
    }
    const products = await ProductModel.find({ ...query }).sort({ name: 1 });
    return products;
  },
  product: async (parent, args) => {
    const { id } = args;
    const product = await ProductModel.findById(id);
    return product;
  },
};
