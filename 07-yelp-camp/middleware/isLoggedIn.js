const isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login?origin=" + req.route.path);
}

module.exports = isLoggedIn;
