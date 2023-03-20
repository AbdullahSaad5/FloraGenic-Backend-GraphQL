import mongoose from "mongoose";
const Schema = mongoose.Schema;

const complaintSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["Feedback", "Complaint", "Suggestion", "Bug"],
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: new Date(),
    immutable: true,
  },
  read: {
    type: Boolean,
    default: false,
  },
});

export const ComplaintModel = mongoose.model("Complaint", complaintSchema);
