import { GardenerModel } from "../Gardeners/db.js";
import { NurseryOwnerModel } from "../NurseryOwner/db.js";
import { ProductModel } from "../Products/db.js";
import { ReviewModel } from "./db.js";

export const ReviewQuery = {
  reviews: async (parent, args, ctx, info) => {
    const { user } = ctx;

    if (user?.userType === "NurseryOwner") {
      const nurseryOwner = await NurseryOwnerModel.findOne({ userID: user.id });
      const products = await ProductModel.find({
        nurseryID: { $in: nurseryOwner.nurseries },
      });

      const productIDs = products.map((product) => product.id);

      return await ReviewModel.find({ productID: { $in: productIDs } });
    } else if (user?.userType === "Admin") {
      return await ReviewModel.find();
    } else {
      if (!args.productID) {
        throw new Error("Product ID is required");
      } else {
        return await ReviewModel.find({ productID: args.productID });
      }
    }
  },
};
