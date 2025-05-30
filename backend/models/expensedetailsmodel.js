const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const expenseSchema = new Schema({
  amount: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Expenses", expenseSchema);

