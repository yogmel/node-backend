[Go back to Summary](./../README.md);

# Node

## Installation

- [Download](https://nodejs.org/en/) and install Node.

To check if node is installed, check its version in the terminal:

```
$ node -v
```

To execute a node file, execute in the terminal:

```
$ node file.js
```

# Express

A Node web framework for web and mobile applications, such as creating routes and APIs.

## Installation

```
$ npm install express --save
```

## Calling and starting a server

```javascript
var express = require("express");
var app = express();
```

First of all, you need to initializate the server:

```javascript
app.listen(3000, "localhost", () => {
  console.log("Server now listening");
});
```

The first parameter is the port number, the second is the host and the last one is the callback when the server starts to listen.

In order to make it listen, you have to run in the terminal:

```
$ node file-name.js
```

## Routing

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
app.get("*", (req, res) => {
  res.send("Page not found");
});
```

**Some methods**

`res.send("message")`: render a page with passed value
`res.render("index.ejs")`: render specific page
`res.redirect("/path")`: calls another route


## Post requests

The Express method `.post()` can be used in a similar way of `.get()`. When the path is called, it will perform a series of actions.

For example, in a form, the `action` attribute can point to the post path.

`friends.ejs`:

```javascript
<form action="/addfriend" method="POST">
  <input type="text" name="newfriend" placeholder="name">
  <input type="submit" value="submit">
</form>
```

_Note: check [Body Parser section](./support-libraries.md#body-parser)_
