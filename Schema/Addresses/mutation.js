import { AuthenticationError } from "apollo-server-core";
import { AddressModel } from "./db.js";

export const AddressMutation = {
  addressCreate: async (root, args, context) => {
    const { input } = args;
    const { user } = context;
    if (!user) throw new AuthenticationError("You are not authenticated!");
    const address = new AddressModel({
      ...input,
      userID: user.id,
    });
    await address.save();
    return "Address created successfully!";
  },
};
