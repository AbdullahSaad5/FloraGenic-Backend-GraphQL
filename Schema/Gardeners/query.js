import { GardenerModel } from "./db.js";

export const GardenerQuery = {
  gardener: async (_, args) => {
    const { id } = args;
    const gardener = await GardenerModel.findById(id);
    return gardener;
  },
  gardeners: async (_, args) => {
    const gardeners = await GardenerModel.find();
    return gardeners;
  },

  gardenerSearch: async (_, args) => {
    const { search } = args;
    const gardeners = await GardenerModel.find({
      $or: [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
      ],
    });
    return gardeners;
  },
};
