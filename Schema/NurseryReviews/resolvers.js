import { CustomerModel } from "../Customers/db.js";
import { GardenerModel } from "../Gardeners/db.js";
import { ProductModel } from "../Products/db.js";
import { NurseryModel } from "../Nurseries/db.js";
import { NurseryReviewModel } from "./db.js";

export const NurseryReviewResolvers = {
  customerDetails: async (parent, args, ctx, info) => {
    const customer = await CustomerModel.findOne({
      userID: parent.userID,
    });
    return customer;
  },
  nurseryDetails: async (parent, args, ctx, info) => {
    return await NurseryModel.findOne({ _id: parent.nurseryID });
  },
  totalReviews: async (parent, args, ctx, info) => {
    const productReviews = await NurseryReviewModel.find({
      nurseryID: parent.nurseryID,
    });
    return productReviews.length;
  },
};
