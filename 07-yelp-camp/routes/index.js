const express = require("express");
const router = express.Router();
const User = require('./../models/user');
const passport = require("passport");

// Routes
router.get("/", (req, res) => {
  res.render("landing");
});

// Auth routes
router.get("/register", (req, res) => {
  res.render("register");
})

router.post("/register", (req, res) => {
  const {username, password} = req.body;
  User.register(new User({username}), password)
  .then(user => { 
    passport.authenticate("local")(req, res, () => {
      res.redirect("/campgrounds");
    })
  })
  .catch(err => {
    console.log(err);
    res.redirect("/register")
  })
})

router.get("/login", (req, res) => {
  const { user } = req;
  const { origin } = req.query;
  res.render("login", {user, origin});
})
 
router.post("/login", passport.authenticate("local", {
  failureRedirect: "/login" 
}), (req, res) => {
  const { origin } = req.query;
  res.redirect("/campgrounds" + origin);
})

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/campgrounds");
})

module.exports = router;
