const Campground = require("./../models/campgrounds");
const Comment = require("./../models/comment");

const middlewareObj = {
  isLoggedIn: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash("error", "Please login first!");
    res.redirect("/login?origin=" + req.route.path);
  },
  checkCampgroundOwnership: (req, res, next) => {
    if (req.isAuthenticated()) {
      Campground.findById(req.params.id)
        .then((campground) => {
          if (campground.author.id.equals(req.user._id)) {
            next();
          } else {
            req.flash("error", "You don't have permission");
            res.redirect("back");
          }
        })
        .catch(() => {
          req.flash("error", "Campground not found");
          res.redirect("back");
        });
    } else {
      req.flash("error", "Please login first!");
      res.redirect("back");
    }
  },
  checkCommentOwnership: (req, res, next) => {
    if (req.isAuthenticated()) {
      const { comment_id } = req.params;
      Comment.findById(comment_id)
        .then((comment) => {
          if (comment.author.id.equals(req.user._id)) {
            next();
          }
        })
        .catch((err) => {
          req.flash("error", "You don't have permission");
          res.redirect("back");
        });
    } else {
      req.flash("error", "Please log in first");
      res.redirect("back");
    }
  },
};

module.exports = middlewareObj;
