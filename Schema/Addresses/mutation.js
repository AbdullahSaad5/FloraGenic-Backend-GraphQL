import { AddressModel } from "./db.js";

export const AddressMutation = {
  addressCreate: async (root, args, context) => {
    const { input } = args;
    const { userID, name, location, city, setAsDefault } = input;
    const address = new AddressModel({
      userID,
      name,
      location,
      city,
      setAsDefault,
    });
    await address.save();
    return address;
  },
};
