import { SkillModel } from "./db.js";

export const SkillQuery = {
  skill: async (_, args) => {
    const { id } = args;
    const skill = await SkillModel.findById(id);
    return skill;
  },
  skills: async () => {
    const skills = await SkillModel.find();
    return skills;
  },
  skillSearch: async (_, args) => {
    const { search } = args;
    const skills = await SkillModel.find({
      $or: [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ],
    });
    return skills;
  },
};
