import { NurseryModel } from "../Nurseries/db.js";
import { NurseryOwnerModel } from "../NurseryOwner/db.js";
import { ProductModel } from "./db.js";
export const ProductQuery = {
  products: async (parent, args, context) => {
    const query = {};
    const userType = context?.user?.userType || "Customer";

    if (args.data) {
      const { name, description, category, nurseryID } = args.data;
      if (name) {
        query.$or = [
          { name: { $regex: name, $options: "i" } },
          { description: { $regex: name, $options: "i" } },
        ];
      }

      if (category) {
        query.category = { $regex: category, $options: "i" };
      }

      if (nurseryID) {
        query.nurseryID = nurseryID;
      }
    }

    let products = [];

    if (userType === "NurseryOwner") {
      const nurseryOwner = await NurseryOwnerModel.findOne({
        userID: context.user.id,
      });

      products = await ProductModel.find({
        nurseryID: {
          $in: nurseryOwner.nurseries,
        },
      }).sort({ name: 1 });
    } else if (userType === "Customer") {
      products = await ProductModel.find({ ...query, hidden: false }).sort({
        name: 1,
      });
    } else {
      products = await ProductModel.find({ ...query }).sort({ name: 1 });
    }

    return products;
  },
  product: async (parent, args, context) => {
    const { id } = args;
    let product;

    const userType = context?.user?.userType || "Customer";

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
