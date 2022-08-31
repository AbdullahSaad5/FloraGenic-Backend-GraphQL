import { GigModel } from "./db.js";

export const GigQuery = {
  gigs: async (_, args) => {
    const { gardenerID } = args || {};
    const gigs = await GigModel.find({ gardenerID });
    return gigs;
  },
  gig: async (_, args) => {
    const { id } = args;
    const gig = await GigModel.findById(id);
    return gig;
  },
  gigSearch: async (_, args) => {
    const { search } = args;
    const gigs = await GigModel.find({
      $or: [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ],
    });
    return gigs;
  },
};
