import { NurseryOwnerModel } from "../NurseryOwner/db.js";
import { NurseryModel } from "./db.js";
import { ProductModel } from "../Products/db.js";

export const NurseryMutation = {
  nurseryCreate: async (parent, args, ctx) => {
    const { data } = args;
    const user = ctx.user;
    if (user.userType !== "NurseryOwner" && !args?.data?.nurseryOwnerID) {
      throw new Error("Nursery Owner ID is required");
    }
    if (user.userType === "NurseryOwner") {
      const nurseryOwner = await NurseryOwnerModel.findOne({
        userID: user.id,
      });
      if (!nurseryOwner) throw new Error("Nursery Owner not found");
      data.nurseryOwnerID = nurseryOwner._id;
    }
    const nursery = new NurseryModel(data);
    await nursery.save();
    const nurseryOwner = await NurseryOwnerModel.findById(data.nurseryOwnerID);
    nurseryOwner.nurseries.push(nursery._id);
    await nurseryOwner.save();
    return "Nursery created successfully";
  },
  nurseryUpdate: async (parent, args, ctx) => {
    const { id, data } = args;
    const user = ctx.user;

    if (!user) throw new Error("You are not authorized to update this nursery");

    const nursery = await NurseryModel.findById(id);
    if (!nursery) throw new Error("Nursery not found");
    const nurseryOwner = await NurseryOwnerModel.findOne({
      nurseries: {
        $in: [nursery._id],
      },
    });

    if (data.nurseryOwnerID && user?.userType === "Admin") {
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
    }
    await nursery.updateOne({ $set: data });

    return "Nursery Update Successful";
  },
  nurseryDelete: async (parent, args, ctx) => {
    const { id } = args;

    const user = ctx.user;
    if (!user) throw new Error("You are not authorized to delete this nursery");
    let nurseryOwner;
    let nursery;
    if (user?.userType === "Admin") {
      nursery = await NurseryModel.findById(id);
      if (!nursery) throw new Error("Nursery not found");
      nurseryOwner = await NurseryOwnerModel.findOne({
        nurseries: {
          $in: [nursery._id],
        },
      });
    } else if (user?.userType === "NurseryOwner") {
      nursery = await NurseryModel.findOne({
        _id: id,
        nurseryOwnerID: user.id,
      });
      if (!nursery) throw new Error("Nursery not found");
      // Finding the owner
      nurseryOwner = await NurseryOwnerModel.findById(user.id);
    } else {
      throw new Error("You are not authorized to delete this nursery");
    }

    // Finding nursery

    if (!nurseryOwner) throw new Error("Nursery Owner not found");
    // Removing the nursery from the owner's nurseries array

    nurseryOwner.nurseries.pull(nursery._id);

    // Saving the owner and removing the nursery
    await nurseryOwner.save();
    await nursery.remove();
    await ProductModel.deleteMany({ nurseryID: nursery._id });
    return "Nursery deleted successfully";
  },

  nurseryBlock: async (parent, args) => {
    const { id } = args;
    const nursery = await NurseryModel.findById(id);
    if (!nursery) throw new Error("Nursery not found");
    nursery.blockedStatus = !nursery.blockedStatus;

    await ProductModel.updateMany(
      { nurseryID: nursery._id },
      { $set: { hidden: nursery.blockedStatus } }
    );

    await nursery.save();
    return `Nursery ${
      nursery.blockedStatus ? "blocked" : "unblocked"
    } successfully`;
  },
};
