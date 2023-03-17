import { GardenerModel } from "./db.js";

export const GardenerMutation = {
  gardenerCreate: async (_, args) => {
    const { data } = args;
    const gardener = await GardenerModel.create(data);
    return gardener;
  },
  gardenerUpdate: async (_, args) => {
    const { id, data } = args;
    const gardener = await GardenerModel.findOneAndUpdate(
      id,
      {
        $set: data,
      },
      { new: true }
    );
    return gardener;
  },
  gardenerDelete: async (_, args) => {
    const { id } = args;
    await GardenerModel.findByIdAndDelete(id);
    return "Gardener deleted successfully";
  },
  gardenerBlock: async (_, args) => {
    const { id } = args;
    const gardener = await GardenerModel.findById(id);
    await UserModel.findByIdAndUpdate(gardener.userID, {
      $set: {
        isBlocked: !this.isBlocked,
      },
    });

    return "Gardener blocked successfully";
  },
  endorseSkill: async (_, args) => {
    const { gardenerID, skillID } = args;
    const gardener = await GardenerModel.findById(gardenerID);
    const skill = gardener.skills.find((skill) => skill.skill == skillID);
    skill.endorsements += 1;
    await gardener.save();
    return "Skill endorsed successfully";
  },
};
