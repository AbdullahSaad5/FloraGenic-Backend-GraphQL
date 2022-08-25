const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const complaintSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  type: {
    type: String,
    required: true,
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
    default: Date.now,
    immutable: true,
  },
  read: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Complaint", complaintSchema);
