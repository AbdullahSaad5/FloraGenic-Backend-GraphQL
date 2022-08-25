const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
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
    length: 13,
  },
  image: {
    type: String,
    default:
      "https://res.cloudinary.com/dzqbzqgqw/image/upload/v1589788981/default_avatar_qxqzqr.png",
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

adminSchema.pre("findOneAndUpdate", function (next) {
  this.update({}, { $set: { updatedAt: Date.now() } });
  next();
});

module.exports = mongoose.model("Admin", adminSchema);
