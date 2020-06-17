const Campground = require("./../models/campgrounds");
const Comment = require("./../models/comment");

const middlewareObj = {
  isLoggedIn: (req, res, next) => {
    if(req.isAuthenticated()) {
      return next();
    }
    res.redirect("/login?origin=" + req.route.path);
  },
  checkCampgroundOwnership: (req, res, next) => {
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
  },
  checkCommentOwnership: (req, res, next) => {
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
}

module.exports = middlewareObj;

