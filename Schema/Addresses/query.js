import { AddressModel } from "./db.js";

export const AddressQuery = {
  addresses: async (parent, args, context) => {
    const { user } = context;
    const { id: userID } = user;
    return await AddressModel.find({ userID });
  },
  address: async (parent, args, context) => {
    const { id } = args;
    const { user } = context;
    const { id: userID } = user;
    return await AddressModel.findOne({ _id: id, userID });
  },
};
