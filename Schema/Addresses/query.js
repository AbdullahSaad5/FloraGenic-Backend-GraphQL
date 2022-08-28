import { AddressModel } from "./db.js";

export const AddressQuery = {
  addresses: async (parent, args) => {
    const { userID, model_type } = args;
    return await AddressModel.find({ userID, model_type });
  },
};
