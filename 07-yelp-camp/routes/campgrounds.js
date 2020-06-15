const express = require("express");
const router = express.Router();
const Campground = require("./../models/campgrounds");

const isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

router.get("/", (req, res) => {
  const { user } = req;
  console.log(user)
  Campground.find({})
  .then(campgrounds => {
    res.render("index", { campgrounds, user });
  })
  .catch(err => {
    console.log(err);
  })
});

router.post("/", isLoggedIn, (req, res) => {
  const { name, imgurl: image, description } = req.body;
  const { _id: id, username } = req.user;
  const author = { id, username };

  Campground.create({ name, image, description , author})
  .then(campground => {
    console.log("NEWLY CREATED CAMPGROUND:");
    console.log(campground);
    res.redirect("/campgrounds");
  })
  .catch(err => {
    console.log(err);
  })
});

router.get("/new", isLoggedIn, (req, res) => {
  res.render("campgrounds/new");
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  Campground.findById(id).populate("comments").exec()
  .then(campground => {
    res.render("campgrounds/show", { campground });
  })
  .catch(err => { console.log(err) })
});

module.exports = router;
