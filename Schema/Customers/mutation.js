// Customers/mutation.js
import { CustomerModel } from "./db.js";

export const CustomerMutation = {
  customerCreate: async (parent, args) => {
    const {
      userID,
      firstName,
      lastName,
      dateOfBirth,
      nationality,
      phoneNumber,
      gender,
      image,
    } = args.data;

    const customer = await CustomerModel.create({
      userID,
      firstName,
      lastName,
      dateOfBirth,
      nationality,
      phoneNumber,
      gender,
      image,
    });

    return customer;
  },
  customerUpdate: async (parent, args) => {},
  customerDelete: async (parent, args) => {},
  customerBlock: async (parent, args) => {},
};
