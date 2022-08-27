import { AdminModel } from "./db.js";
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
    const { id } = args;
    await AdminModel.findByIdAndDelete(id);
    return "Admin deleted successfully";
  },

  adminBlock: async (_, args) => {
    const { id } = args;
    const admin = await AdminModel.findById(id);
    await UserModel.findByIdAndUpdate(admin.userID, {
      $set: {
        isBlocked: !this.isBlocked,
      },
    });

    return "Admin blocked successfully";
  },
};
