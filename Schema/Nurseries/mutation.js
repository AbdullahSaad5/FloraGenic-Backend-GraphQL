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
    const nursery = await NurseryModel.findById(id);
    if (!nursery) throw new Error("Nursery not found");
    const nurseryOwner = await NurseryOwnerModel.findOne({
      nurseries: {
        $in: [nursery._id],
      },
    });

    // If nursery owner is not the same as the one in the data
    if (nurseryOwner._id != data.nurseryOwnerID) {
      nurseryOwner.nurseries.pull(nursery._id);
      await nurseryOwner.save();
      const newNurseryOwner = await NurseryOwnerModel.findById(
        data.nurseryOwnerID
      );
      newNurseryOwner.nurseries.push(nursery._id);
      await newNurseryOwner.save();
    }

    // Updating the nursery
    await nursery.updateOne({ $set: data });

    // const nursery = await NurseryModel.findByIdAndUpdate(
    //   id,
    //   {
    //     $set: data,
    //   },
    //   {
    //     new: true,
    //   }
    // );
    return "Nursery Update Successful";
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

  nurseryBlock: async (parent, args) => {
    const { id } = args;
    const nursery = await NurseryModel.findById(id);
    if (!nursery) throw new Error("Nursery not found");
    nursery.blockedStatus = !nursery.blockedStatus;
    await nursery.save();
    return `Nursery ${
      nursery.blockedStatus ? "blocked" : "unblocked"
    } successfully`;
  },
};
