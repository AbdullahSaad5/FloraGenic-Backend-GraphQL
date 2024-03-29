import mongoose from "mongoose";
const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
  productID: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  userID: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export const FavoriteItemModel = mongoose.model("Favorite", favoriteSchema);
