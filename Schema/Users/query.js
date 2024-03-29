import { ApolloError, AuthenticationError } from "apollo-server-core";
import db from "../../connection.js";
import { AdminModel } from "../Admins/db.js";
import { CustomerModel } from "../Customers/db.js";
import { GardenerModel } from "../Gardeners/db.js";
import { NurseryOwnerModel } from "../NurseryOwner/db.js";
import { UserModel } from "./db.js";

export const UserQuery = {
  users: async (parent, args, ctx) => {
    const { user } = ctx;

    if (!user) {
      throw new AuthenticationError("You are not authenticated");
    }

    if (user.userType !== "Admin") {
      throw new AuthenticationError("You are not authenticated");
    }

    const session = await db.startSession();
    try {
      session.startTransaction();
      const users = await UserModel.find(
        {
          userType: { $ne: "Admin" },
        },
        null,
        { session }
      );
      await Promise.all(
        users.map(async (user) => {
          let userDetails;
          switch (user.userType) {
            case "Customer":
              userDetails = await CustomerModel.findOne(
                { userID: user._id },
                null,
                { session }
              );
              break;
            case "Admin":
              userDetails = await AdminModel.findOne(
                { userID: user._id },
                null,
                {
                  session,
                }
              );
              break;
            case "Gardener":
              userDetails = await GardenerModel.findOne(
                { userID: user._id },
                null,
                { session }
              );
              break;
            case "NurseryOwner":
              userDetails = await NurseryOwnerModel.findOne(
                {
                  userID: user._id,
                },
                null,
                { session }
              );
              break;
            default:
              throw new ApolloError("User type not found");
          }
          user.details = userDetails;
        })
      );
      await session.commitTransaction();
      return users;
    } catch (err) {
      await session.abortTransaction();
      throw new ApolloError(err);
    } finally {
      await session.endSession();
    }
  },

  user: async (_, args) => {
    const { id } = args;
    const user = await UserModel.findById(id);
    if (!user) {
      throw new ApolloError("User not found");
    }
    let userDetails;
    switch (user.userType) {
      case "Customer":
        userDetails = await CustomerModel.findOne({ userID: user.id });
        break;
      case "Admin":
        userDetails = await AdminModel.findOne({ userID: user.id });
        break;
      case "Gardener":
        userDetails = await GardenerModel.findOne({ userID: user.id });
        break;
      case "NurseryOwner":
        userDetails = await NurseryOwnerModel.findOne({ userID: user.id });
        break;
      default:
        throw new ApolloError("User type not found");
    }
    user.details = userDetails;
    return user;
  },
  profileDetails: async (_, args, ctx) => {
    const { user } = ctx;
    if (!user) {
      throw new AuthenticationError("You are not authenticated");
    }

    const { id } = user;
    const userr = await UserModel.findById(id);
    if (!user) {
      throw new ApolloError("User not found");
    }

    let userDetails;
    switch (user.userType) {
      case "Customer":
        userDetails = await CustomerModel.findOne({ userID: user.id });
        break;
      case "Admin":
        userDetails = await AdminModel.findOne({ userID: user.id });
        break;
      case "Gardener":
        userDetails = await GardenerModel.findOne({ userID: user.id });
        break;
      case "NurseryOwner":
        userDetails = await NurseryOwnerModel.findOne({ userID: user.id });
        break;
      default:
        throw new ApolloError("User type not found");
    }
    user.details = userDetails;
    return user;
  },
};
