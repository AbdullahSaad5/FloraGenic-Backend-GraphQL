import { UserModel } from "../Users/db.js";

export const NurseryOwnerResolvers = {
  userDetails: async (nurseryOwner) => {
    const user = await UserModel.findById(nurseryOwner.userID);
    return user;
  },
};
