const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  flash = require("connect-flash"),
  LocalStrategy = require("passport-local"),
  User = require('./models/user'),
  methodOverride = require("method-override");
  seedDB = require("./seed");

const commentRoutes = require("./routes/comments"),
  campgroundRoutes = require("./routes/campgrounds"),
  indexRoutes = require("./routes/index");

// seedDB();

// mongoose.connect("mongodb://localhost:27017/yelp_camp", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false
// });

mongoose.connect("mongodb+srv://yogmel:taetiseo252422@cluster0-mw0no.mongodb.net/yelpcamp?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
app.set("view engine", "ejs");

// Passport configuration
app.use(require("express-session")({
  secret: "Once again Rusty wins cutest dog!",
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Middleware

app.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
})

app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/", indexRoutes);

app.listen(3000, "localhost", () => {
  console.log("server has started");
});
