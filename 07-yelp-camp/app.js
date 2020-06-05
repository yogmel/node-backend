const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  seedDB = require("./seed");

// seedDB();

mongoose.connect("mongodb://localhost:27017/yelp_camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

const Campground = require("./models/campgrounds");
const Comment = require("./models/comment");

app.get("/", (req, res) => {
  res.render("landing");
});

app.get("/campgrounds", (req, res) => {
  Campground.find({}, (err, campgrounds) => {
    try {
      res.render("index", { campgrounds });
    } catch (err) {
      console.log(err);
    }
  });
});

app.post("/campgrounds", (req, res) => {
  const { name, imgurl: image, description } = req.body;

  Campground.create({ name, image, description }, (err, campground) => {
    try {
      console.log("NEWLY CREATED CAMPGROUND:");
      console.log(campground);
      res.redirect("/campgrounds");
    } catch {
      console.log(err);
    }
  });
});

app.get("/campgrounds/new", (req, res) => {
  res.render("campgrounds/new");
});

app.get("/campgrounds/:id", async (req, res) => {
  const { id } = req.params;

  await Campground.findById(id).populate("comments").exec()
  .then(campground => {
    res.render("campgrounds/show", { campground });
  })
  .catch(err => { console.log(err) })
});

// Comments routes
app.get("/campgrounds/:id/comments/new", async (req, res) => {
  const { id } = req.params;
  await Campground.findById(id)
  .then(campground => {
    res.render("comments/new", { campground });
  })
  .catch(err => { console.log(err) })
});

app.post("/campgrounds/:id/comments", async (req, res) => {
  const { comment } = req.body;
  
  const campground = await Campground.findById(req.params.id)

  await Comment.create(comment)
  .then(comment => {
    campground.comments.push(comment);
    campground.save();
  })
  
  res.redirect(`/campgrounds/${req.params.id}`);
})

app.listen(3000, "localhost", () => {
  console.log("server has started");
});
