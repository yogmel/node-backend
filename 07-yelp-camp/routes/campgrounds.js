const express = require("express");
const router = express.Router();
const Campground = require("./../models/campgrounds");
const isLoggedIn = require("./../middleware/isLoggedIn");

router.get("/", (req, res) => {
  const { user } = req;
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

// EDIT
router.get("/:id/edit", isLoggedIn, (req, res) => {
  Campground.findById(req.params.id)
  .then(campground => {
    res.render("campgrounds/edit", { campground });
  })
  .catch(err => console.log(err));
})

// UPDATE
router.put("/:id", (req, res) => { 
  const { id } = req.params;
  const { campground } = req.body;
  Campground.findByIdAndUpdate(id, campground)
  .then(campground => {
    res.redirect("/campgrounds/" + id);
  })
  .catch(err => { console.log(err) })
})

// DESTROY
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  Campground.findById(id)
  .then(campground => {
    console.log('camp deleted: ', campground);
    campground.remove();
    res.redirect("/campgrounds")
  })
  .catch(err => { console.log(err) })
})

module.exports = router;
