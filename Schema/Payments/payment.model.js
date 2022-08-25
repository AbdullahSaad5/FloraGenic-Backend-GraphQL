const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
  cardHolderName: {
    type: String,
    required: true,
  },
  cardNumber: {
    type: String,
    required: true,
    unique: true,
  },
  cardExpiryDate: {
    type: String,
    required: true,
  },
  cardCVV: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Payment", paymentSchema);
