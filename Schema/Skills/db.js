import mongoose from "mongoose";
const Schema = mongoose.Schema;

const skillSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  hiddenStatus: {
    type: Boolean,
    default: false,
  },
});

export const SkillModel = mongoose.model("Skill", skillSchema);
