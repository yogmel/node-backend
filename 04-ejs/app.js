const express = require("express");
const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (_, res) => {
  res.render("home.ejs");
});

app.get("/fallinginlovewith/:thing", (req, res) => {
  const thing = req.params.thing;
  res.render("love.ejs", { thing });
});

app.get("/posts", (req, res) => {
  const posts = [
    { title: "Post 1", author: "lindona" },
    { title: "Post 2", author: "Pepita" },
    { title: "Post 3", author: "clark" },
  ];
  res.render("posts.ejs", { posts });
});

app.listen(3000, "localhost", () => {
  console.log("Server started!");
});
