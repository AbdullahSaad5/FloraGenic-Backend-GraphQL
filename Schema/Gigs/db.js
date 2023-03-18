import mongoose from "mongoose";
const Schema = mongoose.Schema;

const gigSchema = new Schema({
  
});

export const GigModel = mongoose.model("Gig", gigSchema);
