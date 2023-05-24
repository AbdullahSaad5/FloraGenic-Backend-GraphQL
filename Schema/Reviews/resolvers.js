import { CustomerModel } from "../Customers/db.js";
import { GardenerModel } from "../Gardeners/db.js";
import { ProductModel } from "../Products/db.js";
import { NurseryModel } from "../Nurseries/db.js";
import { ReviewModel } from "./db.js";

export const ReviewResolvers = {
  customerDetails: async (parent, args, ctx, info) => {
    const customer = await CustomerModel.findOne({
      userID: parent.userID,
    });
    return customer;
  },
  productDetails: async (parent, args, ctx, info) => {
    const productType = parent.productType;
    let product;
    if (productType === "Gardener") {
      product = await GardenerModel.findById(parent.productID);
    } else if (productType === "Nursery") {
      product = await NurseryModel.findById(parent.productID);
    } else {
      product = await ProductModel.findById(parent.productID);
    }
    return product;
  },
  totalReviews: async (parent, args, ctx, info) => {
    const productReviews = await ReviewModel.find({
      productID: parent.productID,
    });
    return productReviews.length;
  },
};
