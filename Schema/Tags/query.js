import { TagModel } from "./db.js";

export const TagQuery = {
  tags: async () => {
    return await TagModel.find();
  },
};
