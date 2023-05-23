import { AuthenticationError } from "apollo-server-core";
import { AddressModel } from "./db.js";

export const AddressQuery = {
  addresses: async (parent, args, context) => {
    const { user } = context;
    if (!user) throw new AuthenticationError("You are not authenticated");
    const { id: userID } = user;
    return await AddressModel.find({ userID }).sort({ setAsDefault: -1 });
  },
  address: async (parent, args, context) => {
    const { id } = args;
    const { user } = context;
    if (!user) throw new AuthenticationError("You are not authenticated");
    const { id: userID } = user;
    return await AddressModel.findOne({ _id: id, userID });
  },
};
