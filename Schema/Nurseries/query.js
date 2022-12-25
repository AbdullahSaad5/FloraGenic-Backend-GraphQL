import { NurseryModel } from "./db.js";
import { NurseryOwnerModel } from "../NurseryOwner/db.js";
export const NurseryQuery = {
  nurseries: async () => {
    const nurseries = await NurseryModel.find();
    return nurseries;
  },
  nursery: async (parent, args) => {
    const nursery = await NurseryModel.findById(args.id);
    const nurseryOwner = await NurseryOwnerModel.findOne({
      nurseries: {
        $in: [nursery._id],
      },
    });
    if (!nurseryOwner) throw new Error("Nursery Owner not found");
    console.log(nurseryOwner);
    nursery.nurseryOwnerID = nurseryOwner._id;
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
