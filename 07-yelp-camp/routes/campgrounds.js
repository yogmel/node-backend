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
router.get("/:id/edit", checkCampgroundOwnership, (req, res) => {
  Campground.findById(req.params.id)
  .then(campground => {
    res.render("campgrounds/edit", { campground });
  })
  .catch(err => console.log(err));
})

// UPDATE
router.put("/:id", checkCampgroundOwnership, (req, res) => { 
  const { id } = req.params;
  const { campground } = req.body;
  Campground.findByIdAndUpdate(id, campground)
  .then(campground => {
    res.redirect("/campgrounds/" + id);
  })
  .catch(err => { console.log(err) })
})

// DESTROY
router.delete("/:id", checkCampgroundOwnership, (req, res) => {
  const { id } = req.params;
  Campground.findById(id)
  .then(campground => {
    console.log('camp deleted: ', campground);
    campground.remove();
    res.redirect("/campgrounds")
  })
  .catch(err => { console.log(err) })
})

function checkCampgroundOwnership(req, res, next) {
  if(req.isAuthenticated()) {
    Campground.findById(req.params.id)
    .then(campground => {
      if(campground.author.id.equals(req.user._id)) {
        next();
      } else {
        res.redirect("back");
      }
    })
    .catch(() => {res.redirect("back")})
  } else {
    res.redirect("back");
  }
}

module.exports = router;
