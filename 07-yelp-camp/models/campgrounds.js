const mongoose = require("mongoose");
const Comment = require("./comment");

const campgroundsSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    }
  ]
})

campgroundsSchema.pre("remove", async function() {
  await Comment.remove({
    _id: {
      $in: this.comments
    }
  })
})

module.exports = mongoose.model("Campground", campgroundsSchema);
