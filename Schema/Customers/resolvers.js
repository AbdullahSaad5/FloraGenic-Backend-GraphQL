// product/resolvers.js
import { UserModel } from "../Users/db.js";
export const CustomerResolvers = {
  userDetails: async (parent) => {
    return await UserModel.findById(parent.userID);
  },
};
