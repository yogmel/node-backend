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
  image: String
})

const Campground = mongoose.model("Campground", campgroundsSchema);

app.get('/', (req, res) => {
  res.render('landing');
})

app.get('/campgrounds', (req, res) => {
  Campground.find({}, (err, campgrounds) => {
    try {
      res.render('campgrounds', { campgrounds });
    } catch(err) {
      console.log(err);
    }
  })
})

app.post('/campgrounds', (req, res) => {
  const name = req.body.name;
  const image = req.body.imgurl;

  Campground.create({name, image}, (err, campground) => {
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

app.listen(3000, 'localhost', () => {
  console.log('server has started');
})
