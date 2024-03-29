import { ApolloError } from "apollo-server-core";
import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";
import db from "../../connection.js";
import { AdminModel } from "../Admins/db.js";
import { CartItemModel } from "../CartItems/db.js";
import { CustomerModel } from "../Customers/db.js";
import { FavoriteItemModel } from "../FavoriteItems/db.js";
import { GardenerModel } from "../Gardeners/db.js";
import { NurseryModel } from "../Nurseries/db.js";
import { NurseryOwnerModel } from "../NurseryOwner/db.js";
import { ProductModel } from "../Products/db.js";
import { UserModel } from "./db.js";
import { ReviewModel } from "../Reviews/db.js";
import jwtDecode from "jwt-decode";
import bcrypt from "bcrypt";
import sgMail from "@sendgrid/mail";
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const UserMutation = {
  login: async (_, args) => {
    const { email, password, userType } = args.credentials;
    const user = await UserModel.findOne({ email, userType });
    if (!user) {
      throw new ApolloError("Error: Invalid Credentials. Please try again");
    }
    const isMatch = await user.comparePassword(password);
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

  loginWithToken: async (_, args) => {
    const details = jwtDecode(args.token);

    const email = details.email;

    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new ApolloError(
        "Error: You are not registered. Please register to continue!"
      );
    }

    if (user.bannedStatus) {
      throw new ApolloError(
        "Error: Your account has been banned. Please contact the admin"
      );
    }

    let userDetails;
    switch (user.userType) {
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
      await session.endSession();
    }
  },

  registerWithToken: async (_, args) => {
    const { token, userType } = args;
    const details = jwtDecode(token);

    const session = await db.startSession();
    try {
      session.startTransaction();
      const alreadyExists = await UserModel.findOne(
        { email: details.email, userType },
        null,
        {
          session,
        }
      );

      if (alreadyExists) {
        throw new ApolloError("Error: User already exists with this email");
      }

      await UserModel.create(
        [
          {
            email: details.email,
            userType,
          },
        ],
        {
          session,
          validateBeforeSave: false,
        }
      );

      await session.commitTransaction();
      return "Congratulations! You have successfully registered";
    } catch (err) {
      console.log(err);
      await session.abortTransaction();
      throw new ApolloError(err);
    } finally {
      await session.endSession();
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
      await session.endSession();
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
      await session.endSession();
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
            userID: user[0]._id,
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
      await session.endSession();
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
      await session.endSession();
    }
  },

  updateAdmin: async (_, args) => {
    const { id, credentials, details } = args;
    const session = await db.startSession();
    try {
      session.startTransaction();
      const user = await UserModel.findById(id, null, { session });
      if (!user) {
        throw new ApolloError("Error: User not found on the provided ID");
      }
      user.userType = credentials.userType;
      if (credentials.password) {
        user.password = credentials.password;
      }
      await user.save({ session });
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
      await session.endSession();
    }
  },

  updateGardener: async (_, args) => {
    const { id, credentials, details } = args;

    const user = await UserModel.findById(id);
    if (!user) {
      throw new ApolloError("Error: User not found on the provided ID");
    }
    user.userType = credentials.userType;
    if (credentials.password) {
      user.password = credentials.password;
    }
    await user.save();

    const gardener = GardenerModel.findOne({ userID: id });

    await GardenerModel.findOneAndUpdate(
      { userID: id },
      { $set: { ...details } }
    );
    return "Gardener details updated successfully";
  },

  updateNurseryOwner: async (_, args) => {
    const { id, credentials, details } = args;

    const user = await UserModel.findById(id);
    if (!user) {
      throw new ApolloError("Error: User not found on the provided ID");
    }
    user.userType = credentials.userType;
    if (credentials.password) {
      user.password = credentials.password;
    }
    await user.save();
    await NurseryOwnerModel.findOneAndUpdate({ userID: id }, { $set: details });
    return "Nursery owner details updated successfully";
  },

  updateCustomer: async (_, args) => {
    const { id, details } = args;

    const user = await UserModel.findById(id);
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
    const { email, userType } = args;
    const user = UserModel.findOne({ email, userType });
    if (!user) {
      throw new Error("Error: You are not registered with us");
    }
    const token = Math.floor(100000 + Math.random() * 900000);
    await UserModel.findOneAndUpdate(
      { email, userType },
      {
        $set: {
          passwordResetToken: token,
          passwordResetExpires: Date.now() + 3600000,
        },
      }
    );

    // Sendgrid email here
    const msg = {
      to: email,
      from: "floragenic.fyp@gmail.com",
      subject: "Password reset request",
      text: "Password reset token",
      html: `<p>You have requested for password reset. Please use the following token to reset your password</p>
      <p>Token: ${token}</p>
      <p>If you did not request for password reset, please ignore this email</p>`,
    };
    await sgMail.send(msg);

    return "Password reset token has been sent to your email";
  },

  resetPassword: async (_, args) => {
    const { password, token } = args;
    try {
      const user = await UserModel.findOne({
        passwordResetToken: token,
        passwordResetExpires: { $gt: new Date() },
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
      const user = await UserModel.findById(id, null, { session });
      if (!user) {
        throw new Error("Error: User not found on the provided ID");
      }
      await user.remove({ session });
      switch (user.userType) {
        case "Customer":
          await ReviewModel.deleteMany(
            {
              userID: user._id,
            },
            { session }
          );
          await CartItemModel.deleteMany(
            {
              userID: user._id,
            },
            { session }
          );
          await FavoriteItemModel.deleteMany(
            {
              userID: user._id,
            },
            { session }
          );
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
          // Delete all nurseries, products and reviews of the nursery owner
          const nurseryOwner = await NurseryOwnerModel.findOne(
            { userID: user._id },
            null,
            { session }
          );

          // Delete all nurseries of the nursery owner
          await NurseryModel.deleteMany(
            {
              id: { $in: nurseryOwner?.nurseries },
            },
            { session }
          );
          // Get all products of the nursery owner
          const products = await ProductModel.find(
            {
              nurseryID: { $in: nurseryOwner?.nurseries },
            },
            null,
            { session }
          );
          // Delete all products of the nursery owner
          await ProductModel.deleteMany(
            {
              nurseryID: { $in: nurseryOwner?.nurseries },
            },
            { session }
          );
          // Delete all reviews of the products
          await ReviewModel.deleteMany(
            {
              productID: { $in: products.map((product) => product._id) },
            },
            { session }
          );
          // Delete the nursery owner
          await NurseryOwnerModel.findOneAndDelete(
            { userID: user._id },
            { session }
          );
          break;

        default:
          throw new ApolloError("Error: Invalid user type");
      }
      await session.commitTransaction();
      return "User deleted successfully";
    } catch (err) {
      await session.abortTransaction();
      throw new ApolloError(err);
    } finally {
      await session.endSession();
    }
  },

  blockUser: async (_, args) => {
    const { id } = args;
    const user = await UserModel.findById(id);
    if (!user) throw new Error("Error: User not found on the provided ID");

    if (user?.userType === "NurseryOwner") {
      const nurseryOwner = await NurseryOwnerModel.findOne({
        userID: user._id,
      });

      await NurseryModel.updateMany(
        { _id: { $in: nurseryOwner?.nurseries } },
        { $set: { blockedStatus: !user.bannedStatus } }
      );

      await ProductModel.updateMany(
        { nurseryID: { $in: nurseryOwner?.nurseries } },
        { $set: { hidden: !user.bannedStatus } }
      );
    }

    user.bannedStatus = !user.bannedStatus;
    await user.save();

    return `User ${user.bannedStatus ? "blocked" : "unblocked"} successfully`;
  },

  changePassword: async (_, args, ctx) => {
    const { oldPassword, newPassword } = args;

    const userType = ctx?.user?.userType;
    if (!userType) throw new Error("You are not authenticated");

    const user = await UserModel.findById(ctx?.user?.id);

    if (!user) throw new Error("You are not authenticated");

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      throw new ApolloError("Error: Incorrect old password");
    }

    user.password = newPassword;

    await user.save();
    return "Password changed successfully";
  },

  updateProfile: async (_, args, ctx) => {
    const userType = ctx?.user?.userType;

    if (!userType) throw new Error("You are not authenticated");

    let updatedProfile = null;
    switch (userType) {
      case "Customer":
        updatedProfile = await CustomerModel.findOneAndUpdate(
          { userID: ctx?.user?.id },
          { $set: args.details },
          { new: true }
        );
        break;
      case "Admin":
        updatedProfile = await AdminModel.findOneAndUpdate(
          { userID: ctx?.user?.id },
          { $set: args.details },
          { new: true }
        );
        break;
      case "Gardener":
        updatedProfile = await GardenerModel.findOneAndUpdate(
          { userID: ctx?.user?.id },
          { $set: args.details },
          { new: true }
        );
        break;
      case "NurseryOwner":
        updatedProfile = await NurseryOwnerModel.findOneAndUpdate(
          { userID: ctx?.user?.id },
          { $set: args.details },
          { new: true }
        );
        break;
      default:
        throw new ApolloError("Error: Invalid user type");
    }

    return {
      firstName: updatedProfile?.firstName,
      lastName: updatedProfile?.lastName,
      phoneNumber: updatedProfile?.phoneNumber,
      gender: updatedProfile?.gender,
      image: updatedProfile?.image,
    };
  },
};
