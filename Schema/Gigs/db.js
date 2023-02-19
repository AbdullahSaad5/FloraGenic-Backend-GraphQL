import mongoose from "mongoose";
const Schema = mongoose.Schema;

const gigSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

export const GigModel = mongoose.model("Gig", gigSchema);
