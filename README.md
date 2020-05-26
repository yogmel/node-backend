# Node.js and MongoDB

Collection of notes, examples and projects - Node.js & MongoDB

## Node

### Installation

- [Download](https://nodejs.org/en/) and install Node.

To check if node is installed, check its version in the terminal:

```
$ node -v
```

To execute a node file, execute in the terminal:

```
$ node file.js
```

## Express

A Node web framework for web and mobile applications, such as creating routes and APIs.

### Installation

```
$ npm install express --save
```

### Calling and starting a server

```javascript
var express = require("express");
var app = express();
```

First of all, you need to initializate the server:

```javascript
app.listen(3000, "localhost", function () {
  console.log("Server now listening");
});
```

The first parameter is the port number, the second is the host and the last one is the callback when the server starts to listen.

In order to make it listen, you have to run in the terminal:

```
$ node file-name.js
```

### Routing

- [Example file - firstExpress.js](/03-express/firstExpress.js);
- [Example file - expressExercise.js](/03-express/firstExpress.js);

To create a route with a GET request:

```javascript
app.get("/", function (req, res) {
  res.render("This is the homepage");
});
```

The first parameter of the `.get()` method is the path, and the second is the callback. The callback can have two other parameters: request information and response.

The request parameter carries information about the homepage and path. The response can send information to the browser.

For instance, variables can be passed and be used, by adding `:` before the variable:

```javascript
app.get("/dog/:breed", function (req, res) {
  res.send(`This is the ${req.params.breed} page`);
});

// when entering /dog/salsicha path, the output would be "This is the salsicha page"
```

It is important to also add a route if the requested path does not match any of the previouly specified ones. Add it last in the routes definition.

```javascript
app.get("*", function (req, res) {
  res.send("Page not found");
});
```

### EJS

Short for [Embedded JavaScript](https://ejs.co/), it allows the addition of Javascript syntax into HTML markup.

#### Installation

```
$ npm i ejs
```

Create a file with the `.ejs` extension in order to create the template. HMTlL markup can be used, along with Javascript syntax, adding some `<%= %>` tags, if there is something to return:

```javascript
<h1>You fell in love with <%= thing.toUpperCase() %></h1>
```

If nothing is returned, then `<% %>` is used:

```javascript
<% arr.forEach((item) => { %>
  <li> item </li>
<% >}) %>
```

#### Partials

There is the possibility to also add other files inside another, with the inclusion of partials:

```javascript
<%- include('partials/header') %>
```

### Post requests

The Express method `.post()` can be used in a similar way of `.get()`. When the path is called, it will perform a series of actions.

For example, in a form, the `action` attribute can point to the post path.

`friends.ejs`:

```javascript
<form action="/addfriend" method="POST">
  <input type="text" name="newfriend" placeholder="name">
  <input type="submit" value="submit">
</form>
```

_Note: check Body Parser section_

## API

Short for Application Programming Interface, it is an interface for code to talk to one another.

### XML and JSON

XML is short for Extended Markup Language, it looks like HTML, but with custom tags.

```xml
<person>
  <age>21</age>
  <name>Travis</name>
  <city>Los Angeles</city>
</person>
```

JSON is short for Javascript Object Notation. It looks like a Javascript object, but its value have `""` (they are strings).

```json
{
  "person": {
    "age": "21",
    "name": "Travis",
    "city": "Los Angeles"
  }
}
```

Both formats can be used when sending API information, although today is more common to see JSON, as most calls are made from Javascript.

---

## MongoDB

A database is a collection of information/data. It has an interface so developers can interact with it.

### SQL (relational) vs. NoSQL (non-relational)

**SQL database** is tabular and flat. Data is storage in a table and data can be united via a join table.

For example, if there is a table with user information and another one with comments, the data can be related by creating a join table and connect the comments with the user ids.

If there is another column to be accessed by only one user, all of the other rows would need to have values for that column, even if those are null or empty. That means that patterns need to be followed to all data inputs.

**NoSQL (non-relational)** database is not tabular and data can be nested. It looks a lot with Javascript objects. That means that patterns do not need to be followed to all data, in other words, the db is more flexible, as its data values are somewhat independent.

[MongoDB](https://www.mongodb.com/) is one of the most popular databases and the most popular non-relational database. It also a part of the MEAN Stack (MongoDB, Express, Angular and Nodejs).

### MongoDB Shell Basics

To run mongo on your machine, you will need to install MongoDB and then start via `mongod`. This varies according to OS, check for [Ubuntu instructions](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/#run-mongodb-community-edition).

Start and stop MongoDB in Ubuntu using `systemd`:

```
sudo systemctl start mongod
sudo service mongod stop
```

Once it starts, open another terminal window and run, to open its shell:

```
mongo
```

It will open the Mongo Shell. Now Mongo commands will work.

- `help`: show available commands.
- `show dbs`: show all initiated databases.
- `use db_name`: switch to db_name. If it doesn't exist, it will be created.
- `db.collection_name.insert({name: "Name", age: 20})`: add collection to the current database and insert entry.
- `show collections`: show collections in the current database
- `db.collection_name.find()`: returns all elements in the collection
- `db.collection_name.find({name: "Name"})`: returns data that contains that specific property.
- `db.collection_name.update({name: "Name"}, {name: "OtherName"})`: finds the data that has that specific property and overwrite all its properties with the second parameter.
- `db.collection_name.update({name: "Name"}, {$set: {name: "OtherName"}})`: do not overwrite, rather it will keep its other properties and overwrite the specified one.
- `db.collection_name.remove({name: "Name"})`: remove data that matches passed properties
- `db.collection_name.drop()`: delete all items in collection

### Mongoose

[Mongoose](https://github.com/Automattic/mongoose) allows an easy way to connect Mongo into Node applications.

**Installation**

```
npm i mongoose --save
```

**Usage**

```javascript
const mongoose = require("mongoose");

// connect with mongodb
mongoose.connect("mongodb://localhost:27017/collection_name", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Allows findByIdAndUpdate() and related methods
mongoose.set("useFindAndModify", false);

// define a model with Schema
// for all properties: https://github.com/Automattic/mongoose#defining-a-model
const blogSchema = new mongoose.Schema({
  title: String,
  rating: Number,
  body: String,
});

const Blog = mongoose.model("Blog", blogSchema);
```

#### Common functions

Defining and saving a new object:

```javascript
const firstPost = new Blog({
  title: "My first blog post",
  rating: 5,
  body: "A lot of things to say",
  created: { type: Date, default: Date.now },
});

firstPost.save((err, blogPost) => {
  if (err) {
    // error handling
  } else {
    // success
  }
});
```

Or simply creating (define and saves in a single method):

```javascript
Blog.create(
  {
    title: "My first blog post",
    rating: 5,
    body: "A lot of things to say",
  },
  (err, blogPost) => {
    if (err) {
      // error handling
    } else {
      // success
    }
  }
);
```

Common operations:

```javascript
// returns all items in a collection
Blog.find({}, (err, blogs) => {});

// return a single object, that matches the passed id
Blog.findById(id, (err, blog) => {});

// finds a single object and change it to the updated parameter
Blog.findByIdAndUpdate(id, update, (err, blog) => {});

// find a single object and delete it
Blog.findByIdAndDelete(id, (err, blog) => {});
```

## RESTful Routes

REST is a pattern for creating routes, for CRUD (create, read, update and destroy) operations.

| name    | url            | verb   | description                               | Mongoose Method         |
| ------- | -------------- | ------ | ----------------------------------------- | ----------------------- |
| INDEX   | /dogs          | GET    | Display a list of all dogs                | Dog.find()              |
| NEW     | /dogs/new      | GET    | Display form to make a new dog            | N/A                     |
| CREATE  | /dogs          | POST   | Add new dog to DB, then redirects         | Dog.create()            |
| SHOW    | /dogs/:id      | GET    | Shows info about one dog                  | Dog.findById()          |
| EDIT    | /dogs/:id/edit | GET    | Shows edit for one one dog                | Dog.findById()          |
| UPDATE  | /dogs/:id      | PUT    | Update info about one dog, then redirects | Dog.findByIdAndUpdate() |
| DESTROY | /dogs/:id      | DELETE | Delete one dog, then redirects            | Dog.findByIdAndRemove() |

## Data Association

---

## Support libraries

### Nodemon

Nodemon is a library used for server watching each file modification.

```
$ npm i -g nodemon
```

### Body Parser

When submitted, the form will send information. But in order to use it, we have to install a support library called "BodyParser". It will parse the object that comes in `req.body`.

```
$ npm i body-parser --save
```

```javascript
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/addfriend", (req, res) => {
  const { newfriend } = req.body; // with body-parser we can use the incoming object
  friends.push(newfriend);
  res.redirect("/friends"); // redirect to the specified path
});
```

### Method Override

HTML does not support requests with verbs different than POST and GET. To do that, a library must be used, which is `methodOverride`.

**Installation**

```
npm i method-override --save
```

**Use**

```javascript
const methodOverride = require("method-override");

app.use(methodOverride("param")); // the param passed can be any custom string
```
