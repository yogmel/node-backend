const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/data_blog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const postSchema = {
  title: String,
  content: String,
};

const Post = mongoose.model("Post", postSchema);

const userSchema = {
  name: String,
  email: String,
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
};

const User = mongoose.model("User", userSchema);

// create new user
User.create({
  name: "Mell - Obj",
  email: "example@gmail.com",
});

// create post and add reference to user
Post.create(
  {
    title: "Now referencing objects",
    content: "Content of a post",
  },
  (err, post) => {
    User.findOne({ name: "Mell - Obj" }, (err, user) => {
      try {
        user.posts.push(post);
        user.save((err, user) => {
          try {
            console.log("post saved");
          } catch (err) {
            console.log(err);
          }
        });
      } catch (err) {
        console.log(err);
      }
    });
  }
);

// Find user, add full posts to array instead of object ids and then execute fnnction
User.findOne({name: "Mell - Obj"}).populate("posts").exec((err, user) => {
  try {
    console.log('user: ', user);
  } catch(err) {
    console.log(err);
  }
})
