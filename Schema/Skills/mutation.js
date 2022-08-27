import { SkillModel } from "./db.js";

export const SkillMutation = {
  skillCreate: async (_, args) => {
    const { data } = args;
    const skill = await SkillModel.create(data);
    return skill;
  },
  skillUpdate: async (_, args) => {
    const { id, data } = args;
    const skill = await SkillModel.findByIdAndUpdate(
      id,
      {
        $set: data,
      },
      { new: true }
    );
    return skill;
  },
  skillDelete: async (_, args) => {
    const { id } = args;
    await SkillModel.findByIdAndDelete(id);
    return "Skill deleted successfully";
  },
};
