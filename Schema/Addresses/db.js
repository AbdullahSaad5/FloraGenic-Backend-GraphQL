import mongoose from "mongoose";
const Schema = mongoose.Schema;

const addressSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  pin: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  setAsDefault: {
    type: Boolean,
    default: false,
  },
});

// If address is the only address for a user, set it as default
addressSchema.pre("save", async function (next) {
  const users = await AddressModel.find({
    userID: this.userID,
    model_type: this.model_type,
  });
  if (users.length == 0) {
    this.setAsDefault = true;
  }
  next();
});
// If address is default, set all previous addresses to false
addressSchema.pre("save", async function (next) {
  if (this.setAsDefault) {
    this.constructor
      .updateMany(
        { userID: this.userID, model_type: this.model_type },
        { setAsDefault: false }
      )
      .exec();
  }
  next();
});

// If address is updated to default, set all previous addresses to false
addressSchema.pre("findOneAndUpdate", async function (next) {
  if (this.getUpdate().setAsDefault) {
    this.update({}, { setAsDefault: false });
  }
  next();
});

export const AddressModel = mongoose.model("Address", addressSchema);
