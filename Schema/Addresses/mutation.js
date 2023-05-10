import { AuthenticationError } from "apollo-server-core";
import { AddressModel } from "./db.js";

export const AddressMutation = {
  addressCreate: async (root, args, context) => {
    const { input } = args;
    const { user } = context;
    if (!user) throw new AuthenticationError("You are not authenticated!");
    const { name, location, pin, city, setAsDefault } = input;
    const address = new AddressModel({
      userID: user.id,
      name,
      location,
      pin,
      city,
      setAsDefault,
    });
    await address.save();
    return address;
  },
};
