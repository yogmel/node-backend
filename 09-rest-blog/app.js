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
mongoose.set('useFindAndModify', false);
// Set default view engine to ejs
app.set("view engine", "ejs");
// App will use public directory as default root
app.use(express.static("public"));
// Parse information that comes from forms
app.use(bodyParser.urlencoded({extended: true}));
// Override methods by adding parameter to URL
app.use(methodOverride("_method"));
// Allow use of sanitizer method, to minimize user abuse on forms
app.use(expressSanitizer());

// Mongoose Schema and model config
const blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {type: Date, default: Date.now}
});

const Blog = mongoose.model("Blog", blogSchema);

// RESTFUL ROUTES
// Index and blogs: show all blogs
app.get("/", (req, res) => {
  res.redirect("/blogs");
})

app.get("/blogs", (req, res) => {
  Blog.find({}, (err, blogs) => {
    try {
      res.render("index", {blogs});
    } catch(err) {
      console.log(err)
    }
  })
})

// Add new post: show page and add new post into DB
app.get("/blogs/new", (req, res) => {
  res.render("new")
})

app.post("/blogs", (req, res) => {
  Blog.create(req.body.blog, (err, newBlog) => {
    try {
      console.log('new blog created: ', newBlog);
      res.redirect("/blogs");
    } catch (err) {
      console.log(err);
    }
  })
})

// Show specific blog post
app.get("/blogs/:id", (req, res) => {
  Blog.findById(req.params.id, (err, blog) => {
    try {
      res.render("show", {blog});
    } catch (err) {
      console.log(err);
    }
  })
})

// Edit blog post
app.get("/blogs/:id/edit", (req, res) => {
  Blog.findById(req.params.id, (err, blog) => {
    try{
      console.log('blog', blog)
      res.render("edit", {blog});
    } catch(err) {
      console.log(err);
    }
  })
})

// Update blog post
app.put("/blogs/:id", (req, res) => {
  Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, blog) => {
    try {
      res.redirect(`/blogs/${req.params.id}`)
    } catch(err) {
      console.log(err);
    }
  })
})

// Delete blog post
app.delete('/blogs/:id', (req, res) => {
  Blog.findByIdAndDelete(req.params.id, err => {
    try {
      res.redirect('/blogs');
    } catch(err) {
      console.log(err)
    }
  })
})

// Start server
app.listen(3000, 'localhost', () => {
  console.log("server is running");
})
