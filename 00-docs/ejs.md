[Go back to Summary](./../README.md);

# EJS

Short for [Embedded JavaScript](https://ejs.co/), it allows the addition of Javascript syntax into HTML markup.

## Installation

```
$ npm i ejs
```

In `app.js`, for ease development, the app can set the defaul view engine to be the .ejs format.

```javascript
app.set("view engine", "ejs");

res.render("results", { data }); // there is no need to add .ejs to the "results" string
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

## Partials

There is the possibility to also add other files inside another, with the inclusion of partials:

```javascript
<%- include('partials/header') %>
```
