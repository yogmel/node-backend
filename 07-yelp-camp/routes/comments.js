const express = require("express");
const router = express.Router({mergeParams: true});
const Comment = require("./../models/comment");
const Campground = require("./../models/campgrounds");
const isLoggedIn = require("./../middleware/isLoggedIn");
const user = require("../models/user");

// CREATE routes
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

// EDIT
router.get("/:comment_id/edit", checkCommentOwnership, (req, res) => {
  const { id, comment_id } = req.params;
  Comment.findById(comment_id)
  .then(comment => {
    res.render("comments/edit", { id, comment })
  })
  .catch(err => {console.log(err); res.redirect("back")})
})

// UPDATE
router.put("/:comment_id", checkCommentOwnership, (req, res) => {
  const { id, comment_id } = req.params;
  const { comment } = req.body;
  Comment.findByIdAndUpdate(comment_id, comment)
  .then(comment => {
    res.redirect("/campgrounds/" + id)
  })
  .catch(err => {console.log(err)})
});

// DELETE
router.delete("/:comment_id", checkCommentOwnership, (req, res) => {
  const { id, comment_id } = req.params;
  Comment.findByIdAndDelete(comment_id)
  .then(() => {
    res.redirect("/campgrounds/" + id)
  })
  .catch(err => {console.log(err); res.redirect("back");})
})

function checkCommentOwnership(req, res, next) {
  if(req.isAuthenticated()) {
    const { comment_id } = req.params;
    Comment.findById(comment_id)
    .then(comment => {
      if(comment.author.id.equals(req.user._id)) {
        next();
      }
    })
    .catch(err => {res.redirect("back");})
  } else {
    res.redirect("back");
  }
}

module.exports = router;
