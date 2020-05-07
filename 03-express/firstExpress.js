const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hi there!");
});

app.get("/bye", (req, res) => {
  res.send("Byeeee!");
});

// :name in the route url defines a dynamic value
app.get("/dog/:breed", (req, res) => {
  res.send(`${req.params.breed} Page`); // req (or request) stores the value used in the path
});

// order matters, that is why the 404 is the last route
app.get("*", (req, res) => {
  res.send("you are a start");
});

app.listen(3000, 'localhost', () => {
  console.log('Server started');
});
