import { NurseryOwnerModel } from "../NurseryOwner/db.js";
import { NurseryModel } from "./db.js";

export const NurseryMutation = {
  nurseryCreate: async (parent, args) => {
    const { data } = args;
    const nursery = new NurseryModel(data);
    await nursery.save();
    const nurseryOwner = await NurseryOwnerModel.findById(data.nurseryOwnerID);
    nurseryOwner.nurseries.push(nursery._id);
    await nurseryOwner.save();
    return "Nursery created successfully";
  },
  nurseryUpdate: async (parent, args) => {
    const { id, data } = args;
    const nursery = await NurseryModel.findByIdAndUpdate(
      id,
      {
        $set: data,
      },
      {
        new: true,
      }
    );
    return nursery;
  },
  nurseryDelete: async (parent, args) => {
    const { id } = args;
    await NurseryModel.findByIdAndDelete(id);
    return "Nursery deleted successfully";
  },
};
