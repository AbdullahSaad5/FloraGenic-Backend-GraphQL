import { UserModel } from "../Users/db.js";
export const GardenerResolvers = {
  userDetails: async (parent) => {
    return await UserModel.findById(parent.userID);
  },
};
