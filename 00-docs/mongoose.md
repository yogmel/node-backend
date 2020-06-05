[Go back to Summary](./../README.md);

# Mongoose

[Mongoose](https://github.com/Automattic/mongoose) allows an easy way to connect Mongo into Node applications.

**Installation**

```
npm i mongoose --save
```

**Usage**

```javascript
const mongoose = require("mongoose");

// connect with mongodb
mongoose.connect("mongodb://localhost:27017/collection_name", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Allows findByIdAndUpdate() and related methods
mongoose.set("useFindAndModify", false);

// define a model with Schema
// for all properties: https://github.com/Automattic/mongoose#defining-a-model
const blogSchema = new mongoose.Schema({
  title: String,
  rating: Number,
  body: String,
});

const Blog = mongoose.model("Blog", blogSchema);
```

## Common functions

Defining and saving a new object:

```javascript
const firstPost = new Blog({
  title: "My first blog post",
  rating: 5,
  body: "A lot of things to say",
  created: { type: Date, default: Date.now },
});

firstPost.save((err, blogPost) => {
  if (err) {
    // error handling
  } else {
    // success
  }
});
```

Or simply creating (define and saves in a single method):

```javascript
Blog.create(
  {
    title: "My first blog post",
    rating: 5,
    body: "A lot of things to say",
  },
  (err, blogPost) => {
    if (err) {
      // error handling
    } else {
      // success
    }
  }
);
```

Common operations:

```javascript
// returns all items in a collection
Blog.find({}, (err, blogs) => {});

// return a single object, that matches the passed id
Blog.findById(id, (err, blog) => {});

// finds a single object and change it to the updated parameter
Blog.findByIdAndUpdate(id, update, (err, blog) => {});

// find a single object and delete it
Blog.findByIdAndDelete(id, (err, blog) => {});
```

# Data Association
Happens when two types of data are related, for example users, post, likes on posts etc. The relationship can be one to one, one to many and/or many to many.

Relationships can be created via embedded data or object referencing.

## Embedded Data
The related data is added into the object.

```javascript
const postSchema = {
  title: String,
  content: String,
};

const userSchema = {
  name: String,
  email: String,
  posts: [postSchema], // posts are going to be an array of postSchema
};
```

## Object Reference
Another collection is created and tables are linked via an id.

```javascript
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
```
