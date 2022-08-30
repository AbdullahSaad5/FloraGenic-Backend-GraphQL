import { UserModel } from "../Users/db.js";

export const AdminResolvers = {
  userDetails: async (admin) => {
    const user = await UserModel.findById(admin.userID);
    return user;
  },
};
