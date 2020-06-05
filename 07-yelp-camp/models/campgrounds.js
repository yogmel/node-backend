const mongoose = require("mongoose");

const campgroundsSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
})

module.exports = mongoose.model("Campground", campgroundsSchema);