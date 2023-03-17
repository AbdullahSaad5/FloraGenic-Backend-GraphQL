import { UserModel } from "../Users/db.js";
import { GigModel } from "../Gigs/db.js";

export const GardenerResolvers = {
  userDetails: async (parent) => {
    return await UserModel.findById(parent.userID);
  },
  skills: async (parent) => {
    return await parent.skills.map((skill) => {
      return {
        skill: skill.skill,
        endorsements: skill.endorsements,
      };
    });
  },
  gigs: async (parent) => {
    return await GigModel.find();
  },
};
