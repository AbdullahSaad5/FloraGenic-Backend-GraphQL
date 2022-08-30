import { FavoriteItemModel } from "./db.js";

export const FavoriteItemQuery = {
  favoriteItems: async (_, args) => {
    return await FavoriteItemModel.find({ userID: args.userID });
  },
};
