const mongoose = require('mongoose');

const postSchema = {
  title: String,
  content: String,
};

module.exports = mongoose.model("Post", postSchema);
