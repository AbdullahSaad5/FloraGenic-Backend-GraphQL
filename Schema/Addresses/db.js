import mongoose from "mongoose";
const Schema = mongoose.Schema;

const addressSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
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

export const AddressModel = mongoose.model("Address", addressSchema);
