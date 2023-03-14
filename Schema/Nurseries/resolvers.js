import { NurseryOwnerModel } from "../NurseryOwner/db.js";
import { ProductModel } from "../Products/db.js";
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
  products: async (parent) => {
    const products = await ProductModel.find({
      nurseryID: parent._id,
    });

    return products;
  },
  nurseryOwner: async (parent) => {
    const nurseryOwner = await NurseryOwnerModel.findOne({
      nurseries: {
        $in: [parent._id],
      },
    });
    return nurseryOwner;
  },
};
