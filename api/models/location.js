const mongoose = require("mongoose");
const locationSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  femalePopulation: { type: Number, required: true },
  malePopulation: { type: Number, required: true },
  total: { type: Number, required: true }
});

module.exports = mongoose.model("Location", locationSchema);
