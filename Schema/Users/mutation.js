import { ApolloError } from "apollo-server-core";
import jwt from "jsonwebtoken";
import db from "../../connection.js";
import { AdminModel } from "../Admins/db.js";
import { CustomerModel } from "../Customers/db.js";
import { GardenerModel } from "../Gardeners/db.js";
import { NurseryOwnerModel } from "../NurseryOwner/db.js";
import { UserModel } from "./db.js";

export const UserMutation = {
  login: async (_, args) => {
    const { email, password, userType } = args.credentials;
    const user = await UserModel.findOne({ email, userType });
    if (!user) {
      throw new ApolloError("Error: Invalid Credentials. Please try again");
    }
    const isMatch = await user.comparePassword(password);
    console.log(!isMatch);
    if (!isMatch) {
      throw new ApolloError("Error: Incorrect Password. Please try again");
    }
    if (user.bannedStatus) {
      throw new ApolloError(
        "Error: Your account has been banned. Please contact the admin"
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
        throw new ApolloError("Error: Invalid User Type. Please try again");
    }

    const token = jwt.sign(
      {
        id: user._id,
        userType: user.userType,
        email: user.email,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "30d",
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
    return data;
  },

  register: async (_, args) => {
    const { email, userType } = args.credentials;
    const session = await db.startSession();
    try {
      session.startTransaction();
      const alreadyExists = await UserModel.findOne({ email, userType }, null, {
        session,
      });

      if (alreadyExists) {
        throw new ApolloError("Error: User already exists with this email");
      }

      await UserModel.create([args.credentials], { session });
      await session.commitTransaction();
      return "Congratulations! You have successfully registered";
    } catch (err) {
      console.log(err);
      await session.abortTransaction();
      throw new ApolloError(err);
    } finally {
      session.endSession();
    }
  },

  registerCustomer: async (_, args) => {
    const { email, userType } = args.credentials;
    const session = await db.startSession();
    try {
      session.startTransaction();
      const alreadyExists = UserModel.findOne({ email, userType }, null, {
        session,
      });

      if (alreadyExists) {
        throw new ApolloError("Error: User already exists with this email");
      }

      const user = await UserModel.create([args.credentials], { session });
      await CustomerModel.create(
        [
          {
            userID: user[0]._id,
            ...args.details,
          },
        ],
        { session }
      );
      await session.commitTransaction();
      return "The customer has been registered successfully";
    } catch (err) {
      console.log(err);
      await session.abortTransaction();
      throw new ApolloError(err);
    } finally {
      session.endSession();
    }
  },

  registerAdmin: async (_, args) => {
    const { email, userType } = args.credentials;
    const session = await db.startSession();
    try {
      session.startTransaction();

      const alreadyExists = await UserModel.findOne({ email, userType }, null, {
        session,
      });

      if (alreadyExists) {
        throw new ApolloError("Error: User already exists with this email");
      }

      const user = await UserModel.create([args.credentials], { session });
      await AdminModel.create(
        [
          {
            userID: user[0]._id,
            ...args.details,
          },
        ],
        { session }
      );
      return "The admin has been registered successfully";
    } catch (err) {
      console.log(err);
      await session.abortTransaction();
      throw new ApolloError(err);
    } finally {
      session.endSession();
    }
  },

  registerGardener: async (_, args) => {
    const { email, userType } = args.credentials;
    const session = await db.startSession();
    try {
      session.startTransaction();
      const alreadyExists = await UserModel.findOne({ email, userType }, null, {
        session,
      });

      if (alreadyExists) {
        throw new ApolloError("Error: User already exists with this email");
      }

      const user = await UserModel.create([args.credentials], { session });
      await GardenerModel.create(
        [
          {
            userID: user.id,
            ...args.details,
          },
        ],
        { session }
      );
      await session.commitTransaction();
      return "The gardener has been registered successfully";
    } catch (err) {
      console.log(err);
      await session.abortTransaction();
      throw new ApolloError(err);
    } finally {
      session.endSession();
    }
  },

  registerNurseryOwner: async (_, args) => {
    const session = await db.startSession();
    try {
      session.startTransaction();
      const alreadyExists = await UserModel.findOne(
        {
          email: args.credentials.email,
          userType: args.credentials.userType,
        },
        null,
        { session }
      );
      if (alreadyExists) {
        throw new ApolloError("Error: User with this email already exists");
      }
      const user = await UserModel.create([args.credentials], { session });
      await NurseryOwnerModel.create(
        [
          {
            userID: user[0]._id,
            ...args.details,
          },
        ],
        { session }
      );
      await session.commitTransaction();
      return "The nursery owner has been registered successfully";
    } catch (err) {
      await session.abortTransaction();
      // Throw an informative error message to the client
      throw new ApolloError(err);
    } finally {
      session.endSession();
    }
  },

  updateAdmin: async (_, args) => {
    const { id, details } = args;
    const session = await db.startSession();
    try {
      session.startTransaction();
      const user = await UserModel.findById(id, null, { session });
      if (!user) {
        throw new ApolloError("Error: User not found on the provided ID");
      }
      await AdminModel.findOneAndUpdate(
        { userID: id },
        { $set: details },
        { session }
      );
      await session.commitTransaction();
      return "Admin details updated successfully";
    } catch (err) {
      await session.abortTransaction();
      throw new ApolloError(err);
    } finally {
      session.endSession();
    }
  },

  updateGardener: async (_, args) => {
    const { id, details } = args;

    const user = await UserModel.findById(id, null, { session });
    if (!user) {
      throw new ApolloError("Error: User not found on the provided ID");
    }
    await GardenerModel.findOneAndUpdate({ userID: id }, { $set: details });
    return "Gardener details updated successfully";
  },

  updateNurseryOwner: async (_, args) => {
    const { id, details } = args;

    const user = await UserModel.findById(id, null);
    if (!user) {
      throw new ApolloError("Error: User not found on the provided ID");
    }
    await NurseryOwnerModel.findOneAndUpdate({ userID: id }, { $set: details });
    return "Nursery owner details updated successfully";
  },

  updateCustomer: async (_, args) => {
    const { id, details } = args;

    const user = await UserModel.findById(id, null);
    if (!user) {
      throw new ApolloError("Error: User not found on the provided ID");
    }

    await CustomerModel.findOneAndUpdate({ userID: id }, { $set: details });
    return "Customer details updated successfully";
  },

  addCustomer: async (_, args) => {
    await CustomerModel.create({
      userID: args.userID,
      ...args.details,
    });
    return "Customer added successfully";
  },

  requestPasswordReset: async (_, args) => {
    const { email } = args;
    const user = UserModel.findOne({ email });
    if (!user) {
      throw new Error("Error: You are not registered with us");
    }
    const token = crypto.randomBytes(20).toString("hex");
    user.passwordResetToken = token;
    user.passwordResetExpires = Date.now() + 3600000;
    await user.save();
    // Sendgrid email here

    return "Password reset token has been sent to your email";
  },

  resetPassword: async (_, args) => {
    const { password, token } = args;
    try {
      const user = await UserModel.findOne({
        passwordResetToken: token,
        passwordResetExpires: { $gt: Date.now() },
      });
      if (!user) {
        throw new Error(
          "Error: Password reset token is invalid or has expired"
        );
      }
      user.password = password;
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save();
      return "Password has been reset successfully";
    } catch (err) {
      throw new ApolloError(err);
    }
  },

  deleteUser: async (_, args) => {
    const { id } = args;
    const session = await db.startSession();
    try {
      session.startTransaction();
      const user = await UserModel.findById(id);
      if (!user) {
        throw new Error("Error: User not found on the provided ID");
      }
      await user.remove({ session });
      switch (user.userType) {
        case "Customer":
          await CustomerModel.findOneAndDelete(
            { userID: user._id },
            { session }
          );
          break;
        case "Admin":
          await AdminModel.findOneAndDelete({ userID: user._id }, { session });
          break;
        case "Gardener":
          await GardenerModel.findOneAndDelete(
            { userID: user._id },
            { session }
          );
          break;
        case "NurseryOwner":
          await NurseryOwnerModel.findOneAndDelete(
            { userID: user._id },
            { session }
          );
          break;
        default:
          throw new ApolloError("Error: Invalid user type");
      }
      return "User deleted successfully";
    } catch (err) {
      await session.abortTransaction();
      throw new ApolloError(err);
    } finally {
      session.endSession();
    }
  },

  blockUser: async (_, args) => {
    const { id } = args;
    const user = await UserModel.findById(id);
    user.bannedStatus = !user.bannedStatus;
    await user.save();
    return "User blocked successfully";
  },
};
