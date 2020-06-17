const express = require("express");
const router = express.Router({mergeParams: true});
const Comment = require("./../models/comment");
const Campground = require("./../models/campgrounds");
const middleware = require("./../middleware");

// CREATE routes
router.get("/new", middleware.isLoggedIn, (req, res) => {
  const { id } = req.params;
  Campground.findById(id)
  .then(campground => {
    res.render("comments/new", { campground });
  })
  .catch(err => { console.log(err) })
});

router.post("/", middleware.isLoggedIn, async (req, res) => {
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
router.get("/:comment_id/edit", middleware.checkCommentOwnership, (req, res) => {
  const { id, comment_id } = req.params;
  Comment.findById(comment_id)
  .then(comment => {
    res.render("comments/edit", { id, comment })
  })
  .catch(err => {console.log(err); res.redirect("back")})
})

// UPDATE
router.put("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
  const { id, comment_id } = req.params;
  const { comment } = req.body;
  Comment.findByIdAndUpdate(comment_id, comment)
  .then(comment => {
    res.redirect("/campgrounds/" + id)
  })
  .catch(err => {console.log(err)})
});

// DELETE
router.delete("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
  const { id, comment_id } = req.params;
  Comment.findByIdAndDelete(comment_id)
  .then(() => {
    res.redirect("/campgrounds/" + id)
  })
  .catch(err => {console.log(err); res.redirect("back");})
})


module.exports = router;
