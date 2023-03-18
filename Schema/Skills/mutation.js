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
  skillHide: async (_, args) => {
    const { id } = args;
    const skill = await SkillModel.findById(id);
    if (!skill) throw new Error("Skill not found");
    skill.hiddenStatus = !skill.hiddenStatus;
    await skill.save();
    return `Skill ${skill.hiddenStatus ? "hidden" : "unhidden"} successfully`;
  },
};
