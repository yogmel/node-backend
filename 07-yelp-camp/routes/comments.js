const express = require("express");
const router = express.Router({mergeParams: true});
const Comment = require("./../models/comment");
const Campground = require("./../models/campgrounds");

const isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

// Comments routes
router.get("/new", isLoggedIn, (req, res) => {
  const { id } = req.params;
  Campground.findById(id)
  .then(campground => {
    res.render("comments/new", { campground });
  })
  .catch(err => { console.log(err) })
});

router.post("/", isLoggedIn, async (req, res) => {
  const { comment } = req.body;
  
  const campground = await Campground.findById(req.params.id)

  Comment.create(comment)
  .then(comment => {
    comment.author.id = req.user._id;
    comment.author.username = req.user.username;
    comment.save();
    campground.comments.push(comment);
    campground.save();
    console.log(comment)
  })
  
  res.redirect(`/campgrounds/${req.params.id}`);
})

module.exports = router;
