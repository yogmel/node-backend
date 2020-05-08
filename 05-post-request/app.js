const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

const friends = ['Linda', 'Jess', 'Clau', "Deco"]

app.get('/friends', (req, res) => {
  res.render('friends', {friends});
});

app.post('/addfriend', (req, res) => {
  const { newfriend } = req.body;
  friends.push(newfriend)
  res.redirect('/friends')
})

app.listen(3000, 'localhost', () => {
  console.log("Server started");
});
