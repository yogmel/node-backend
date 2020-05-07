const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hi there, welcome to my assignment!");
});

app.get("/speak/:animal", (req, res) => {
  const { animal } = req.params;
    const sounds = {
    pig: 'Oink',
    cow: 'Moo',
    dog: 'Woof Woof',
    cat: 'I hate you human',
    goldfish: '...'
  }

  res.send(`The ${animal} says "${sounds[animal.toLowerCase()]}"`);
});

app.get("/repeat/:str/:num", (req, res) => {
  const { num, str } = req.params;

  let finalString = "";

  for(let i = 0; i < parseInt(num); i ++) {
    finalString += str + ' ';
  }

  res.send(finalString);
})

app.get("*", (req, res) => {
  res.send("Sorry, nothing to see here");
});

app.listen(3000, "localhost", () => {
  console.log("server started");
});
