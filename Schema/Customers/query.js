// customer/query.js
import { CustomerModel } from "./db.js";

export const CustomerQuery = {
  customer: async (_, args) => {
    const { id } = args;
    const customer = await CustomerModel.findOne({ _id: id });
    return customer;
  },
  customers: async (_, args, { req }) => {
    console.log(req.headers.authorization);
    const customers = await CustomerModel.find({});
    return customers;
  },
  customerSearch: async (_, args) => {
    const { search } = args;
    const customers = await CustomerModel.find({
      $or: [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
      ],
    });
    return customers;
  },
};
