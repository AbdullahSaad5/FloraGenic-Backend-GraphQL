import { UserModel } from "./db.js";
import { CustomerModel } from "../Customers/db.js";
import { AdminModel } from "../Admins/db.js";
import { GardenerModel } from "../Gardeners/db.js";
import { ApolloError } from "apollo-server-core";

export const UserQuery = {
  loginCustomer: async (_, args) => {
    const { email, password, userType } = args.credentials;
    const user = await UserModel.findOne({ email, userType });
    if (!user) {
      throw new ApolloError("User not found");
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new ApolloError("Incorrect password");
    }
    if (user.bannedStatus) {
      throw new ApolloError("User is banned");
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
      default:
        throw new ApolloError("User type not found");
    }
    const data = {
      email: user.email,
      userType: user.userType,
      details: userDetails,
    };
    console.log(data);
    return data;
  },
  users: async () => {
    const users = await UserModel.find();
    await Promise.all(
      users.map(async (user) => {
        let userDetails;
        switch (user.userType) {
          case "Customer":
            userDetails = await CustomerModel.findOne({ userID: user._id });
            console.log(userDetails);
            break;
          case "Admin":
            userDetails = await AdminModel.findOne({ userID: user._id });
            break;
          case "Gardener":
            userDetails = await GardenerModel.findOne({ userID: user._id });
            break;
          default:
            throw new ApolloError("User type not found");
        }
        user.details = userDetails;
      })
    );
    return users;
  },
  // loginCustomer: async (_, args) => {
  //   const { email, password } = args.credentials;
  //   const user = await UserModel.findOne({ email });
  //   if (!user) {
  //     throw new Error("User not found");
  //   }
  //   const isMatch = await user.comparePassword(password);
  //   if (!isMatch) {
  //     throw new Error("Incorrect password");
  //   }
  //   if (user.bannedStatus) {
  //     throw new Error("User is banned");
  //   }
  //   const adminDetails = await CustomerModel.findOne({
  //     userID: user._id,
  //   });
  //   return {
  //     email: user.email,
  //     userType: user.userType,
  //     details: adminDetails,
  //   };
  // },
  // loginAdmin: async (_, args) => {
  //   const { email, password } = args.credentials;
  //   const user = await UserModel.findOne({ email });
  //   if (!user) {
  //     throw new Error("User not found");
  //   }
  //   const isMatch = await user.comparePassword(password);
  //   if (!isMatch) {
  //     throw new Error("Incorrect password");
  //   }
  //   if (user.bannedStatus) {
  //     throw new Error("User is banned");
  //   }
  //   const adminDetails = await AdminModel.findOne({
  //     userID: user._id,
  //   });
  //   return {
  //     email: user.email,
  //     userType: user.userType,
  //     details: adminDetails,
  //   };
  // },
  // loginGardener: async (_, args) => {
  //   const { email, password } = args.credentials;
  //   const user = await UserModel.findOne({ email });
  //   if (!user) {
  //     throw new Error("User not found");
  //   }
  //   const isMatch = await user.comparePassword(password);
  //   if (!isMatch) {
  //     throw new Error("Incorrect password");
  //   }
  //   if (user.bannedStatus) {
  //     throw new Error("User is banned");
  //   }
  //   const gardenerDetails = await GardenerModel.findOne({
  //     userID: user._id,
  //   });
  //   return {
  //     email: user.email,
  //     userType: user.userType,
  //     details: gardenerDetails,
  //   };
  // },
  //   sendResetEmail: async (_, args) => {
  //     const { email } = args;
  //     const user = await UserModel.findOne({ email });
  //     if (!user) {
  //       throw new Error("User not found");
  //     }
  //     const resetToken = await user.generateResetToken();
  //     const resetURL = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
  //     const mailOptions = {
  //       from: process.env.MAIL_FROM,
  //       to: email,
  //       subject: "Reset Password",
  //       html: `<p>You requested a password reset. Click <a href="${resetURL}">here</a> to reset your password.</p>`,
  //     };
  //     await user.sendEmail(mailOptions);
  //     return "Email sent";
  //   }
};
