import { ComplaintModel } from "./db.js";

export const ComplaintQuery = {
  complaints: async (_, args) => {
    const complaints = await ComplaintModel.find();
    return complaints;
  },

  complaint: async (_, args) => {
    const { id } = args;
    const complaint = await ComplaintModel.findById(id);
    return complaint;
  },
  complaintSearch: async (_, args) => {
    const { search } = args;
    const complaints = await ComplaintModel.find({
      $or: [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ],
    });
    return complaints;
  },
};
