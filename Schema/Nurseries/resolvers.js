import { NurseryOwnerModel } from "../NurseryOwner/db.js";
export const NurseryResolvers = {
  nurseryOwnerID: async (parent) => {
    const nurseryOwner = await NurseryOwnerModel.findOne({
      nurseries: {
        $in: [parent._id],
      },
    });
    if (!nurseryOwner) throw new Error("Nursery Owner not found");
    return nurseryOwner._id;
  },
};
