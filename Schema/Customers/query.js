// customer/query.js
import { CustomerModel } from "./db.js";

export const CustomerQuery = {
  customer: async (parent, args) => {
    const { id } = args;
    const customer = await CustomerModel.findOne({ _id: id });
    return customer;
  },
  customers: async (parent, args) => {
    const customers = await CustomerModel.find({});
    return customers;
  },
  customerSearch: async (parent, args) => {
    const { search } = args;
    const customers = await CustomerModel.find({
      firstName: { $regex: search, $options: "i" },
      lastName: { $regex: search, $options: "i" },
    });
    return customers;
  },
};
