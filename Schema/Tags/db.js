import mongoose from "mongoose";
const Schema = mongoose.Schema;

const tagSchema = new Schema({
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
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

tagSchema.pre("findOneAndUpdate", function () {
  this.update({}, { $set: { updatedAt: new Date()() } });
});

export const TagModel = mongoose.model("Tag", tagSchema);
