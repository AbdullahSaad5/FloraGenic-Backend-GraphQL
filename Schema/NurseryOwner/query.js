import { NurseryOwnerModel } from "./db.js";
import { UserModel } from "../Users/db.js";
export const NurseryOwnerQuery = {
  nurseryOwner: async (_, args) => {
    const { id } = args;
    const nurseryOwner = await NurseryOwnerModel.findById(id);
    return nurseryOwner;
  },
  nurseryOwners: async (_, args) => {
    const nurseryOwners = await NurseryOwnerModel.find();
    return nurseryOwners;
  },
  nurseryOwnerSearch: async (_, args) => {
    const { search } = args;
    const nurseryOwners = await NurseryOwnerModel.find({
      $or: [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
      ],
    });
    return nurseryOwners;
  },
};
