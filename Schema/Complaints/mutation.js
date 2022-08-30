import { ComplaintModel } from "./db.js";

export const ComplaintMutation = {
  complaintCreate: async (_, args) => {
    const { data } = args;
    const newComplaint = new ComplaintModel(data);
    await newComplaint.save();
    return newComplaint;
  },
  complaintDelete: async (_, args) => {
    const { id } = args;
    const complaint = await ComplaintModel.findByIdAndDelete(id);
    return complaint;
  },
  complaintRead: async (_, args) => {
    const { id } = args;
    const complaint = await ComplaintModel.findByIdAndUpdate(id, {
      $set: {
        read: true,
      },
    });
    return complaint;
  },
};
