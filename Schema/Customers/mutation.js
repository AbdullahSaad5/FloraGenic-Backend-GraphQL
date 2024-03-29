// Customers/mutation.js
import { CustomerModel } from "./db.js";
import { UserModel } from "../Users/db.js";

export const CustomerMutation = {
  customerCreate: async (_, args, ctx) => {
    const { user } = ctx;

    if (!user) {
      throw new Error("You are not authenticated!");
    }

    if (user.userType === "Customer") {
      throw new Error("You are not authenticated!");
    }

    const { data } = args;
    const customer = await CustomerModel.create({
      ...data,
      userID: user.id,
    });

    return customer;
  },

  customerUpdate: async (_, args) => {
    const { id, data } = args;
    const customer = await CustomerModel.findOneAndUpdate(
      id,
      {
        $set: data,
      },
      { new: true }
    );
    return customer;
  },

  customerDelete: async (_, args) => {
    const { id } = args;
    const customer = await CustomerModel.findByIdAndDelete(id);
    await UserModel.findByIdAndDelete(customer.userID);
    return "Customer deleted successfully";
  },

  customerBlock: async (_, args) => {
    const { id } = args;
    const customer = await CustomerModel.findById(id);
    await UserModel.findByIdAndUpdate(customer.userID, {
      $set: {
        isBlocked: !this.isBlocked,
      },
    });

    return "Customer blocked successfully";
  },
};
