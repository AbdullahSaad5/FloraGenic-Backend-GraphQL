import { PromoModel } from "./db.js";

export const PromoQuery = {
  promos: async () => {
    const promos = await PromoModel.find();
    return promos;
  },
  promo: async (parent, args) => {
    const { id } = args;    
    const promo = await PromoModel.findById(id);
    return promo;
  },
};
