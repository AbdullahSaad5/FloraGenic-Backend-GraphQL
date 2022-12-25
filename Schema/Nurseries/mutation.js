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

    // Finding nursery
    const nursery = await NurseryModel.findById(id);
    if (!nursery) throw new Error("Nursery not found");
    // Finding the owner
    const nurseryOwner = await NurseryOwnerModel.findOne({
      nurseries: {
        $in: [nursery._id],
      },
    });

    console.log(nursery._id);

    if (!nurseryOwner) throw new Error("Nursery Owner not found");
    console.log("Before");
    console.log(nurseryOwner);
    // Removing the nursery from the owner's nurseries array

    nurseryOwner.nurseries.pull(nursery._id);
    console.log("After");
    console.log(nurseryOwner);

    // Saving the owner and removing the nursery
    await nurseryOwner.save();
    await nursery.remove();
    return "Nursery deleted successfully";
  },
};
