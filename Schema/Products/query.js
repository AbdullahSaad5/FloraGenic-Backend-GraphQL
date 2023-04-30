import { NurseryModel } from "../Nurseries/db.js";
import { NurseryOwnerModel } from "../NurseryOwner/db.js";
import { ProductModel } from "./db.js";
export const ProductQuery = {
  products: async (parent, args, context) => {
    const query = {};
    const userType = context?.user?.userType || "Customer";

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

    let products = [];

    if (userType === "NurseryOwner") {
      const nurseyOwner = await NurseryOwnerModel.findOne({
        userID: context.user._id,
      });

      products = await ProductModel.find({
        nurseryID: {
          $in: nurseyOwner.nurseries,
        },
      }).sort({ name: 1 });
    } else {
      products = await ProductModel.find({ ...query }).sort({ name: 1 });
    }

    return products;
  },
  product: async (parent, args) => {
    const { id } = args;
    let product;
    if (userType === "NurseryOwner") {
      const nurseyOwner = await NurseryOwnerModel.findOne({
        userID: context.user._id,
      });

      product = await ProductModel.findOne({
        nurseryID: {
          $in: nurseyOwner.nurseries,
        },
        _id: id,
      });
    } else {
      product = await ProductModel.findById(id);
    }
    return product;
  },
};
