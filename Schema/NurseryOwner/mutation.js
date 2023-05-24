import { NurseryOwnerModel } from "./db.js";
import { UserModel } from "../Users/db.js";
export const NurseryOwnerMutation = {
  nurseryOwnerCreate: async (_, args) => {
    const { user } = ctx;

    if (!user) {
      throw new Error("You are not authenticated!");
    }

    const { data } = args;
    const nurseryOwner = new NurseryOwnerModel({
      ...data,
      userID: user.id,
    });
    await nurseryOwner.save();
    return nurseryOwner;
  },

  nurseryOwnerUpdate: async (_, args) => {
    const { id, data } = args;
    const nurseryOwner = await NurseryOwnerModel.findOneAndUpdate(
      id,
      {
        $set: data,
      },
      { new: true }
    );

    return nurseryOwner;
  },

  nurseryOwnerDelete: async (_, args) => {
    const { data } = args;
    await NurseryOwnerModel.findByIdAndDelete(data);
    return "Nursery Owner deleted successfully";
  },

  nurseryOwnerBlock: async (_, args) => {
    const { data } = args;
    const nurseryOwner = await NurseryOwnerModel.findById(data);
    const user = await UserModel.findById(nurseryOwner.userID);
    await user.updateOne({
      $set: {
        bannedStatus: !user.bannedStatus,
      },
    });
    return "Nursery Owner blocked successfully";
  },
};
