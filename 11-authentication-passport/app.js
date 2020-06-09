const express = require("express"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  bodyParser = require("body-parser"),
  User = require("./models/user"),
  LocalStrategy = require("passport-local");

mongoose.connect("mongodb://localhost:27017/auth_demo_app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  require("express-session")({
    secret: "Rusty is the best and cutest dog in the world",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const isLoggedin = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/register");
};

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/secret", isLoggedin, (req, res) => {
  res.render("secret");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", (req, res) => {
  const { username, password } = req.body;
  User.register(new User({ username }), password)
    .then((user) => {
      console.log(user);
      passport.authenticate("local")(req, res, () => {
        res.redirect("/secret");
      });
    })
    .catch((err) => {
      console.log(err);
      res.render("register");
    });
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login",
  })
);

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

app.listen(3000, "localhost", () => {
  console.log("Server started");
});
