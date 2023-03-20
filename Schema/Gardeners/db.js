import mongoose from "mongoose";
const Schema = mongoose.Schema;

const gardenerSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  CNIC: {
    type: String,
    required: true,
    unique: true,
  },
  skills: [
    {
      type: Schema.Types.ObjectId,
      ref: "Skill",
      required: true,
    },
  ],
  price: {
    type: Number,
    required: true,
  },
  duration: {
    type: String,
    required: true,
    enum: ["Hourly", "Daily", "Weekly", "Monthly"],
  },
  rating: {
    type: Number,
    default: 0,
  },
  experience: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
    default: "https://i.imgur.com/QQHJY9A.png",
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

gardenerSchema.pre("findOneAndUpdate", function (next) {
  this.update({}, { $set: { updatedAt: new Date() } });
  next();
});

export const GardenerModel = mongoose.model("Gardener", gardenerSchema);
