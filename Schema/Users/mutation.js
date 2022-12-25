import { UserModel } from "./db.js";
import { CustomerModel } from "../Customers/db.js";
import { AdminModel } from "../Admins/db.js";
import { NurseryOwnerModel } from "../NurseryOwner/db.js";
import { ApolloError } from "apollo-server-core";
import jwt from "jsonwebtoken";
import { GardenerModel } from "../Gardeners/db.js";

export const UserMutation = {
  loginCustomer: async (_, args) => {
    const { email, password, userType } = args.credentials;
    const user = await UserModel.findOne({ email, userType });
    if (!user) {
      throw new ApolloError("Invalid Credentials. User not found");
    }
    const isMatch = await user.comparePassword(password);
    console.log(!isMatch);
    if (!isMatch) {
      throw new ApolloError("Incorrect Password. Please try again");
    }
    if (user.bannedStatus) {
      throw new ApolloError(
        "User is banned by the admin. Please contact admin"
      );
    }
    let userDetails;
    switch (userType) {
      case "Customer":
        userDetails = await CustomerModel.findOne({ userID: user._id });
        break;
      case "Admin":
        userDetails = await AdminModel.findOne({ userID: user._id });
        break;
      case "Gardener":
        userDetails = await GardenerModel.findOne({ userID: user._id });
        break;
      case "NurseryOwner":
        userDetails = await NurseryOwnerModel.findOne({ userID: user._id });
        break;
      default:
        throw new ApolloError("User type not found");
    }

    const token = jwt.sign(
      {
        id: user._id,
        userType: user.userType,
        email: user.email,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );

    const data = {
      id: user._id,
      email: user.email,
      userType: user.userType,
      bannedStatus: user.bannedStatus,
      details: userDetails,
      token,
    };
    console.log(data);
    return data;
  },

  register: async (_, args) => {
    const { email, password, userType } = args.credentials;
    const alreadyExists = await UserModel.findOne({
      email,
      userType,
    });
    if (alreadyExists) {
      throw new ApolloError("User already exists");
    }
    await UserModel.create(args.credentials);
    return "User created successfully";
  },

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

  registerNurseryOwner: async (_, args) => {
    const user = await UserModel.create(args.credentials);
    await NurseryOwnerModel.create({
      userID: user.id,
      ...args.details,
    });
    return "User created successfully";
  },

  updateAdmin: async (_, args) => {
    const { id, credentials, details } = args;
    const user = await UserModel.findById(id);
    if (!user) {
      throw new ApolloError("User not found");
    }
    await user.updateOne({
      $set: {
        ...credentials,
      },
    });
    await AdminModel.findOneAndUpdate({ userID: id }, { $set: { ...details } });
    return "User updated successfully";
  },

  updateGardener: async (_, args) => {
    const { id, credentials, details } = args;
    const user = await UserModel.findById(id);
    if (!user) {
      throw new ApolloError("User not found");
    }
    await user.updateOne({
      $set: {
        ...credentials,
      },
    });
    await GardenerModel.findOneAndUpdate(
      { userID: id },
      { $set: { ...details } }
    );
    return "User updated successfully";
  },

  updateNurseryOwner: async (_, args) => {
    const { id, credentials, details } = args;
    const user = await UserModel.findById(id);
    if (!user) {
      throw new ApolloError("User not found");
    }
    await user.updateOne({
      $set: {
        ...credentials,
      },
    });
    await NurseryOwnerModel.findOneAndUpdate(
      { userID: id },
      { $set: { ...details } }
    );
    return "User updated successfully";
  },

  updateCustomer: async (_, args) => {
    const { id, credentials, details } = args;
    const user = await UserModel.findById(id);
    if (!user) {
      throw new ApolloError("User not found");
    }
    await user.updateOne({
      $set: {
        ...credentials,
      },
    });
    await CustomerModel.findOneAndUpdate(
      { userID: id },
      { $set: { ...details } }
    );
    return "User updated successfully";
  },

  addCustomer: async (_, args) => {
    await CustomerModel.create({
      userID: args.userID,
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
  deleteUser: async (_, args) => {
    const { id } = args;
    const user = await UserModel.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    await user.remove();
    switch (user.userType) {
      case "Customer":
        await CustomerModel.findOneAndDelete({ userID: user._id });
        break;
      case "Admin":
        await AdminModel.findOneAndDelete({ userID: user._id });
        break;
      case "Gardener":
        await GardenerModel.findOneAndDelete({ userID: user._id });
        break;
      case "NurseryOwner":
        await NurseryOwnerModel.findOneAndDelete({ userID: user._id });
        break;
      default:
        throw new ApolloError("User type not found");
    }
    return "User deleted successfully";
  },
};
