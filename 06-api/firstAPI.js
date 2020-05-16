const express = require('express');
const request = require('request-promise');
const app = express();

app.set("view engine", "ejs");

app.get('/results', (req, res) => {
  const query = req.query.search;
  request(`http://www.omdbapi.com/?s=${query}&apikey=thewdb`)
  .then((json) => {
    const data = JSON.parse(json);
    res.render('results', { data });
  })
  .catch(err => {console.log(err)})
})

app.get('/search', (req, res) => {
  res.render('search');
})

app.listen(3000, 'localhost', () => {
  console.log("started listening")
})
