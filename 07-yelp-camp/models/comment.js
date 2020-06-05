const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema({
  text: String,
  author: String
})

module.exports = mongoose.model("Comment", commentsSchema);
