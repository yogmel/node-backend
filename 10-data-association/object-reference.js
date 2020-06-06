const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/data_blog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Post = require("./models/post");
const User = require("./models/user");

// create new user
User.create({
  name: "Mell - Obj",
  email: "example@gmail.com",
});

// create post and add reference to user
Post.create({
  title: "Now referencing objects",
  content: "Content of a post",
}).then((post) => {
  User.findOne({ name: "Mell - Obj" })
    .then((user) => {
      user.posts.push(post);
      user
        .save()
        .then((user) => {
          console.log("post saved");
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

// Find user, add full posts to array instead of object ids and then execute fnnction
User.findOne({ name: "Mell - Obj" })
  .populate("posts")
  .exec()
  .then((user) => {
    console.log("user: ", user);
  })
  .catch((err) => {
    console.log(err);
  });
