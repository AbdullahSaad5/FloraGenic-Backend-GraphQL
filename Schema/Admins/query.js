import { AdminModel } from "./db.js";
import { UserModel } from "../Users/db.js";
export const AdminQuery = {
  admin: async (_, args) => {
    const { id } = args;
    const admin = await AdminModel.findById(id);
    return admin;
  },
  admins: async (_, args) => {
    const admins = await AdminModel.find();
    // Attach user details to each admin and return
    const adminsWithUserDetails = await Promise.all(
      admins.map(async (admin) => {
        const user = await UserModel.findById(admin.userID);
        return {
          id: admin.id,
          ...admin._doc,
          ...user._doc,
        };
      })
    );
    return adminsWithUserDetails;
  },
  adminSearch: async (_, args) => {
    const { search } = args;
    const admins = await AdminModel.find({
      $or: [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
      ],
    });
    return admins;
  },
};
