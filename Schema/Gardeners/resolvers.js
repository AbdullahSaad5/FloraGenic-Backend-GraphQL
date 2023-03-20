import { UserModel } from "../Users/db.js";
import { GigModel } from "../Gigs/db.js";
import { SkillModel } from "../Skills/db.js";

export const GardenerResolvers = {
  userDetails: async (parent) => {
    return await UserModel.findById(parent.userID);
  },
  skills: async (parent) => {
    const skills = await Promise.all(
      parent.skills.map(async (skill) => {
        return await SkillModel.findById(skill);
      })
    );
    return skills;
  },
};
