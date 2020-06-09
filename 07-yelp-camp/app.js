const express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  LocalStrategy = require("passport-local"),
  Campground = require("./models/campgrounds"),
  Comment = require("./models/comment"),
  User = require('./models/user'),
  seedDB = require("./seed");

// seedDB();

mongoose.connect("mongodb://localhost:27017/yelp_camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
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

const isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
})

// Routes
app.get("/", (req, res) => {
  res.render("landing");
});

app.get("/campgrounds", (req, res) => {
  const { user } = req;
  console.log(user)
  Campground.find({})
  .then(campgrounds => {
    res.render("index", { campgrounds, user });
  })
  .catch(err => {
    console.log(err);
  })
});

app.post("/campgrounds", (req, res) => {
  const { name, imgurl: image, description } = req.body;

  Campground.create({ name, image, description })
  .then(campground => {
    console.log("NEWLY CREATED CAMPGROUND:");
    console.log(campground);
    res.redirect("/campgrounds");
  })
  .catch(err => {
    console.log(err);
  })
});

app.get("/campgrounds/new", (req, res) => {
  res.render("campgrounds/new");
});

app.get("/campgrounds/:id", (req, res) => {
  const { id } = req.params;

  Campground.findById(id).populate("comments").exec()
  .then(campground => {
    res.render("campgrounds/show", { campground });
  })
  .catch(err => { console.log(err) })
});

// Comments routes
app.get("/campgrounds/:id/comments/new", isLoggedIn, (req, res) => {
  const { id } = req.params;
  Campground.findById(id)
  .then(campground => {
    res.render("comments/new", { campground });
  })
  .catch(err => { console.log(err) })
});

app.post("/campgrounds/:id/comments", isLoggedIn, async (req, res) => {
  const { comment } = req.body;
  
  const campground = await Campground.findById(req.params.id)

  Comment.create(comment)
  .then(comment => {
    campground.comments.push(comment);
    campground.save();
  })
  
  res.redirect(`/campgrounds/${req.params.id}`);
})

// Auth routes
app.get("/register", (req, res) => {
  res.render("register");
})

app.post("/register", (req, res) => {
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

app.get("/login", (req, res) => {
  const { user } = req;
  res.render("login", {user});
})

app.post("/login", passport.authenticate("local", {
  successRedirect: "/campgrounds",
  failureRedirect: "/login"
}))

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/campgrounds");
})

app.listen(3000, "localhost", () => {
  console.log("server has started");
});
