import { FavoriteItemModel } from "./db.js";

export const FavoriteItemMutation = {
  createFavoriteItem: async (parent, args) => {
    const { data } = args;
    const favoriteItem = new FavoriteItemModel(data);
    await favoriteItem.save();
    return favoriteItem;
  },
};
