const express = require("express"),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  methodOverride = require("method-override"),
  expressSanitizer = require("express-sanitizer"),
  app = express();

// Server and DB setup
// Connects db to rest_blog collection
mongoose.connect("mongodb://localhost:27017/rest_blog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// Allows findByIdAndUpdate() and related methods
mongoose.set("useFindAndModify", false);
// Set default view engine to ejs
app.set("view engine", "ejs");
// App will use public directory as default root
app.use(express.static("public"));
// Parse information that comes from forms
app.use(bodyParser.urlencoded({ extended: true }));
// Allow use of sanitizer method, to minimize user abuse on forms
app.use(expressSanitizer());
// Override methods by adding parameter to URL
app.use(methodOverride("_method"));

// Mongoose Schema and model config
const blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: { type: Date, default: Date.now },
});

const Blog = mongoose.model("Blog", blogSchema);

// RESTFUL ROUTES
// Index and blogs: show all blogs
app.get("/", (_, res) => {
  res.redirect("/blogs");
});

app.get("/blogs", (_, res) => {
  Blog.find({})
    .then((blogs) => {
      res.render("index", { blogs });
    })
    .catch((err) => {
      console.log(err);
    });
});

// Add new post: show page and add new post into DB
app.get("/blogs/new", (_, res) => {
  res.render("new");
});

app.post("/blogs", (req, res) => {
  req.body.blog.body = req.sanitize(req.body.blog.body);
  Blog.create(req.body.blog)
    .then((newBlog) => {
      console.log("new blog created: ", newBlog);
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log(err);
    });
});

// Show specific blog post
app.get("/blogs/:id", (req, res) => {
  Blog.findById(req.params.id)
    .then((blog) => {
      res.render("show", { blog });
    })
    .catch((err) => {
      console.log(err);
    });
});

// Edit blog post
app.get("/blogs/:id/edit", (req, res) => {
  Blog.findById(req.params.id)
    .then((blog) => {
      console.log("blog", blog);
      res.render("edit", { blog });
    })
    .catch((err) => {
      console.log(err);
    });
});

// Update blog post
app.put("/blogs/:id", (req, res) => {
  req.body.blog.body = req.sanitize(req.body.blog.body);
  Blog.findByIdAndUpdate(req.params.id)
    .then((blog) => {
      res.redirect(`/blogs/${req.params.id}`);
    })
    .catch((err) => {
      console.log(err);
    });
});

// Delete blog post
app.delete("/blogs/:id", (req, res) => {
  Blog.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect("/blogs");
    })
    .catch((err) => {
      console.log(err);
    });
});

// Start server
app.listen(3000, "localhost", () => {
  console.log("server is running");
});
