const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(express.static(__dirname + "/public"));
const campgrounds = [
  {name: "Salmon Creek", image: "http://blog.tremeterra.com.br/wp-content/uploads/2017/10/scott-goodwill-359336-1-1-700x510.jpg"},
  {name: "Granite Hill", image: "http://blog.tremeterra.com.br/wp-content/uploads/2017/10/scott-goodwill-359336-1-1-700x510.jpg"},
  {name: "Mountain Goat's Rest", image: "http://blog.tremeterra.com.br/wp-content/uploads/2017/10/scott-goodwill-359336-1-1-700x510.jpg"},
]

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get('/', (req, res) => {
  res.render('landing');
})

app.get('/campgrounds', (req, res) => {
  res.render('campgrounds', { campgrounds });
})

app.post('/campgrounds', (req, res) => {
  const name = req.body.name;
  const image = req.body.imgurl;

  campgrounds.push({name, image});
  res.redirect('/campgrounds');
})

app.get('/campgrounds/new', (req, res) => {
  res.render('new');
})

app.listen(3000, 'localhost', () => {
  console.log('server has started');
})
