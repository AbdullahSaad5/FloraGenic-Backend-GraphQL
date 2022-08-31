import { AdminModel } from "./db.js";
import { UserModel } from "../Users/db.js";
export const AdminMutation = {
  adminCreate: async (_, args) => {
    const { data } = args;
    const admin = new AdminModel(data);
    await admin.save();
    return admin;
  },

  adminUpdate: async (_, args) => {
    const { id, data } = args;
    const admin = await AdminModel.findOneAndUpdate(
      id,
      {
        $set: data,
      },
      { new: true }
    );
    return admin;
  },

  adminDelete: async (_, args) => {
    const { data } = args;
    await AdminModel.findByIdAndDelete(data);
    return "Admin deleted successfully";
  },

  adminBlock: async (_, args) => {
    const { data } = args;
    const admin = await AdminModel.findById(data);
    const user = await UserModel.findById(admin.userID);
    await user.updateOne({
      $set: {
        bannedStatus: !user.bannedStatus,
      },
    });
    return "Admin blocked successfully";
  },
};
