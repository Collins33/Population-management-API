const mongoose = require("mongoose");
const locationSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true, unique: true },
  femalePopulation: { type: Number, required: true },
  malePopulation: { type: Number, required: true },
  totalPopulation: { type: Number, required: true }
});

module.exports = mongoose.model("Location", locationSchema);
