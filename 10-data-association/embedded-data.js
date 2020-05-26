const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/data_blog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const postSchema = {
  title: String,
  content: String,
};

const userSchema = {
  name: String,
  email: String,
  posts: [postSchema], // posts are going to be an array of postSchema
};

const User = mongoose.model("User", userSchema);

// create new user, push a post and save it into db
const newUser = new User({
  name: "Mell",
  email: "example@gmail.com",
});

newUser.posts.push({
  title: "This is a post",
  content: "Content of a post",
});

newUser.save((err, user) => {
  try {
    console.log("user created: ", user);
  } catch (err) {
    console.log(err);
  }
});

// find a user and add post
User.findOne({ name: "Mell" }, (err, user) => {
  try {
    user.posts.push({
      title: "This post was added after user creation",
      content: "New content",
    });
    user.save((err, user) => {
      try {
        console.log("post posted");
      } catch (err) {
        console.log(err);
      }
    });
  } catch (err) {
    console.log(err);
  }
});
