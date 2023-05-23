import { NurseryModel } from "./db.js";
import { NurseryOwnerModel } from "../NurseryOwner/db.js";
export const NurseryQuery = {
  nurseries: async (parent, args, context) => {
    const { user } = context;

    let nurseries;
    if (user?.userType === "NurseryOwner") {
      const nurseryOwner = await NurseryOwnerModel.findOne({
        userID: user.id,
      });

      nurseries = await NurseryModel.find({
        _id: { $in: nurseryOwner.nurseries },
      });
    } else {
      nurseries = await NurseryModel.find();
    }
    return nurseries;
  },
  nursery: async (parent, args, context) => {
    const { user } = context;
    let nursery;
    if (user?.userType === "NurseryOwner") {
      const nurseryOwner = await NurseryOwnerModel.findOne({
        userId: user.id,
      });
      nursery = await NurseryModel.findOne({
        _id: args.id,
        _id: { $in: nurseryOwner.nurseries },
      });
    } else {
      nursery = await NurseryModel.findById(args.id);
    }

    return nursery;
  },
  nurserySearch: async (parent, args, context) => {
    const { search } = args;
    const { user } = context;
    let nurseries;
    if (user.userType === "NurseryOwner") {
      const nurseryOwner = await NurseryOwnerModel.findOne({
        userId: user.id,
      });
      nurseries = await NurseryModel.find({
        name: { $regex: search, $options: "i" },
        _id: { $in: nurseryOwner.nurseries },
      });
    } else {
      nurseries = await NurseryModel.find({
        name: { $regex: search, $options: "i" },
      });
    }
    return nurseries;
  },
};
