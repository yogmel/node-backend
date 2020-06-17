const express = require("express");
const router = express.Router();
const Campground = require("./../models/campgrounds");
const middleware = require("./../middleware");

router.get("/", (req, res) => {
  const { user } = req;
  Campground.find({})
    .then((campgrounds) => {
      res.render("index", { campgrounds, user });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/", middleware.isLoggedIn, (req, res) => {
  const { name, imgurl: image, description, price } = req.body;
  const { _id: id, username } = req.user;
  const author = { id, username };

  Campground.create({ name, image, description, author, price })
    .then(() => {
      req.flash("success", `Campground ${name} created successfully`);
      res.redirect("/campgrounds");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/new", middleware.isLoggedIn, (req, res) => {
  res.render("campgrounds/new");
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  Campground.findById(id)
    .populate("comments")
    .exec()
    .then((campground) => {
      if (campground === null) throw new Error("Campground not found");
      res.render("campgrounds/show", { campground });
    })
    .catch((err) => {
      req.flash("error", err.message);
      res.redirect("back");
    });
});

// EDIT
router.get("/:id/edit", middleware.checkCampgroundOwnership, (req, res) => {
  Campground.findById(req.params.id)
    .then((campground) => {
      res.render("campgrounds/edit", { campground });
    })
    .catch((err) => {
      req.flash("error", err.message);
      console.log(err);
    });
});

// UPDATE
router.put("/:id", middleware.checkCampgroundOwnership, (req, res) => {
  const { id } = req.params;
  const { campground } = req.body;
  Campground.findByIdAndUpdate(id, campground)
    .then(() => {
      req.flash("success", "Campground editted");
      res.redirect("/campgrounds/" + id);
    })
    .catch((err) => {
      req.flash("error", err.message);
      console.log(err);
    });
});

// DESTROY
router.delete("/:id", middleware.checkCampgroundOwnership, (req, res) => {
  const { id } = req.params;
  Campground.findById(id)
    .then((campground) => {
      req.flash(
        "success",
        "Successfully deleted campground: ",
        campground.name
      );
      campground.remove();
      res.redirect("/campgrounds");
    })
    .catch((err) => {
      req.flash("error", err.message);
      console.log(err);
    });
});

module.exports = router;
