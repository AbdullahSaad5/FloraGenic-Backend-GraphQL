import mongoose from "mongoose";
const Schema = mongoose.Schema;

const nurseryOwnerSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
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
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  nationality: {
    type: String,
    required: true,
  },
  CNIC: {
    type: String,
    required: true,
    unique: true,
    length: 13,
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

nurseryOwnerSchema.pre("findOneAndUpdate", function (next) {
  this.update({}, { $set: { updatedAt: Date.now() } });
  next();
});

export const NurseryOwnerModel = mongoose.model(
  "NurseryOwner",
  nurseryOwnerSchema
);
