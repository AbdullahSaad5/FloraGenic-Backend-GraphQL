import { UserModel } from "../Users/db.js";
import { GigModel } from "../Gigs/db.js";
import { SkillModel } from "../Skills/db.js";

export const GardenerResolvers = {
  userDetails: async (parent) => {
    return await UserModel.findById(parent.userID);
  },
  skills: async (parent) => {
    const skillsWithEndorsements = await Promise.all(
      parent.skills.map(async (skill) => {
        console.log(skill);
        const skillPopulated = await SkillModel.findById(skill._id);
        console.log(skillPopulated);
        return {
          skill: skillPopulated,
          endorsements: skill.endorsements,
        };
      })
    );
    console.log(skillsWithEndorsements);
    return skillsWithEndorsements;
  },
};
