const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/yelp_camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// SCHEMA SETUP
const campgroundsSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
})

const Campground = mongoose.model("Campground", campgroundsSchema);

app.get('/', (req, res) => {
  res.render('landing');
})

app.get('/campgrounds', (req, res) => {
  Campground.find({}, (err, campgrounds) => {
    try {
      res.render('index', { campgrounds });
    } catch(err) {
      console.log(err);
    }
  })
})

app.post('/campgrounds', (req, res) => {
  const { name, imgurl: image, description} = req.body;

  Campground.create({name, image, description}, (err, campground) => {
    try {
      console.log("NEWLY CREATED CAMPGROUND:");
      console.log(campground);
      res.redirect('/campgrounds');
    } catch {
      console.log(err);
    }
  });
})

app.get('/campgrounds/new', (req, res) => {
  res.render('new');
})

app.get('/campgrounds/:id', (req, res) => {
  const { id } = req.params;

  Campground.findById(id, (err, campground) => {
    try {
      console.log("campground", campground);
      res.render("show", { campground });
    } catch (err) {
      console.log(err);
    }
  });
})

app.listen(3000, 'localhost', () => {
  console.log('server has started');
})
