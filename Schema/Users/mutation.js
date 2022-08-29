import { UserModel } from "./db.js";
import { CustomerModel } from "../Customers/db.js";
import { AdminModel } from "../Admins/db.js";

export const UserMutation = {
  registerCustomer: async (_, args) => {
    const user = await UserModel.create(args.credentials);
    await CustomerModel.create({
      userID: user.id,
      ...args.details,
    });
    return "User created successfully";
  },

  registerAdmin: async (_, args) => {
    const user = await UserModel.create(args.credentials);
    await AdminModel.create({
      userID: user.id,
      ...args.details,
    });
    return "User created successfully";
  },

  registerGardener: async (_, args) => {
    const user = await UserModel.create(args.credentials);
    await GardenerModel.create({
      userID: user.id,
      ...args.details,
    });
    return "User created successfully";
  },

  resetPassword: async (_, args) => {
    const { password } = args;
    const user = await UserModel.findOne({ passwordResetToken: args.token });
    if (!user) {
      throw new Error("User not found");
    }
    user.password = hash;
    user.passwordResetToken = null;
    await user.save();
    return "Password reset successfully";
  },
};
