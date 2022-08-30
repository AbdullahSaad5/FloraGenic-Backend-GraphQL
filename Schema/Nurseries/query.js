import { NurseryModel } from "./db.js";
export const NurseryQuery = {
  nurseries: async () => {
    const nurseries = await NurseryModel.find();
    return nurseries;
  },
  nursery: async (parent, args) => {
    const nursery = await NurseryModel.findById(args.id);
    return nursery;
  },
  nurserySearch: async (parent, args) => {
    const { search } = args;
    const nurseries = await NurseryModel.find({
      name: { $regex: search, $options: "i" },
    });
    return nurseries;
  },
};
