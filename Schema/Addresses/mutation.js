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
  addressUpdate: async (root, args, context) => {
    const { id, input } = args;
    const { user } = context;
    if (!user) throw new AuthenticationError("You are not authenticated!");
    const address = await AddressModel.findOneAndUpdate(
      { _id: id, userID: user.id },
      input,
      { new: true }
    );
    return address;
  },
  addressDelete: async (root, args, context) => {
    const { id } = args;
    const { user } = context;
    if (!user) throw new AuthenticationError("You are not authenticated!");
    const address = await AddressModel.findOneAndDelete({
      _id: id,
      userID: user.id,
    });
    return address;
  },
  setDefaultAddress: async (root, args, context) => {
    const { id } = args;
    const { user } = context;
    if (!user) throw new AuthenticationError("You are not authenticated!");
    await AddressModel.updateMany(
      { userID: user.id },
      { $set: { setAsDefault: false } }
    );
    const address = await AddressModel.findOneAndUpdate(
      { _id: id, userID: user.id },
      { $set: { setAsDefault: true } },
      { new: true }
    );
    return await AddressModel.find({ userID: user.id });
  },
};
