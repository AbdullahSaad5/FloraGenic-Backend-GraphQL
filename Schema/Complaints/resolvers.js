import { CustomerModel } from "../Customers/db.js";

export const ComplaintResolvers = {
  userDetails: async (complaint) => {
    const customer = await CustomerModel.findById(complaint.userID);
    return customer;
  },
};
