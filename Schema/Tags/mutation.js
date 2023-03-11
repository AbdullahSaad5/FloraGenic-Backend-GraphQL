import { ApolloError } from "apollo-server-core";
import { ProductModel } from "../Products/db.js";
import { TagModel } from "./db.js";

export const TagMutation = {
  tagCreate: async (_, { name }) => {
    const tag = new TagModel({ name });
    await tag.save();
    return tag;
  },
  tagUpdate: async (_, { id, name }) => {
    const tag = await TagModel.findByIdAndUpdate(id, { name });
    return tag;
  },
  tagDelete: async (_, { id }) => {
    const products = await ProductModel.find({
      tags: { $in: [id] },
    });
    if (products.length > 0) {
      throw new ApolloError(
        "Tag is in use. Please remove it from products first."
      );
    }
    const tag = await TagModel.findByIdAndDelete(id);
    return tag;
  },
};
