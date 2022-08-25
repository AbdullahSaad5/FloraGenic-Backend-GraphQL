const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gardenerSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  CNIC: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: true,
    default: "https://i.imgur.com/QQHJY9A.png",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  services: [
    {
      type: Schema.Types.ObjectId,
      ref: "Skill",
      required: true,
    },
  ],
});

gardenerSchema.pre("findOneAndUpdate", function (next) {
  this.update({}, { $set: { updatedAt: new Date() } });
  next();
});

module.exports = mongoose.model("Gardener", gardenerSchema);
