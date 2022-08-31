import { PromoModel } from "./db.js";

export const PromoMutation = {
  promoCreate: async (_, args) => {
    const { input } = args;
    const promo = new PromoModel(input);
    await promo.save();
    return promo;
  },
  promoUpdate: async (_, args) => {
    const { id, input } = args;
    const promo = await PromoModel.findByIdAndUpdate(
      id,
      { $set: input },
      { new: true }
    );
    return promo;
  },
  promoDelete: async (_, args) => {
    const { id } = args;
    await PromoModel.findByIdAndDelete(id);
    return true;
  },
};
