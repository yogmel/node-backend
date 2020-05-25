const express = require("express"),
      mongoose = require("mongoose"),
      bodyParser = require("body-parser"),
      app = express();

mongoose.connect("mongodb://localhost:27017/rest_blog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// Mongoose model config
const blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {type: Date, default: Date.now}
});

const Blog = mongoose.model("Blog", blogSchema);
// Restful routes
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

app.get("/blogs/:id", (req, res) => {
  Blog.findById(req.params.id, (err, blog) => {
    try {
      res.render("show", {blog});
    } catch (err) {
      console.log(err);
    }
  })
})

app.listen(3000, 'localhost', () => {
  console.log("server is running");
})
