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
    const tag = await TagModel.findByIdAndDelete(id);
    return tag;
  },
};
