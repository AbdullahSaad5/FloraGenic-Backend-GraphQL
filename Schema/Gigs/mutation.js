import { GigModel } from "./db.js";
export const GigMutation = {
  gigCreate: async (_, args) => {
    const { input } = args;
    const gig = new GigModel(input);
    await gig.save();
    return gig;
  },
  gigUpdate: async (_, args) => {
    const { id, input } = args;
    const gig = await GigModel.findByIdAndUpdate(
      id,
      { $set: input },
      { new: true }
    );
    return "Gig updated successfully";
  },
  gigDelete: async (_, args) => {
    const { id } = args;
    await GigModel.findByIdAndDelete(id);
    return "Gig deleted successfully";
  },
  gigHide: async (_, args) => {
    const { id } = args;
    const gig = await GigModel.findById(id);
    gig.hidden = true;
    await gig.save();
    return "Gig hidden successfully";
  },
};
