const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  Basic: { type: Number, required: false },
  LTA: { type: Number, required: false },
  HRA: { type: Number, required: false },
  FA: { type: Number, required: false },
  INV: { type: Number, required: false },
  Rent: { type: Number, required: false },
  Med: { type: Number, required: false },
  cityType: { type: String, required: false },
  AppHRA: { type: Number, required: false },
  createdAt: { type: Date, default: new Date() },
});
module.exports = mongoose.model("User", userSchema);
