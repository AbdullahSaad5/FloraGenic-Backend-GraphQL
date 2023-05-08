import { AddressModel } from "./db.js";

export const AddressQuery = {
  addresses: async (parent, args) => {
    const { userID, model_type } = args;
    let addresses = [];
    return await AddressModel.find({ userID, model_type });
  },
  address: async (parent, args) => {
    const { id } = args;
    return await AddressModel.findById(id);
  },
};
