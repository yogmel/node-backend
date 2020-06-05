[Go back to Summary](./../README.md);

# Support libraries

## Nodemon

Nodemon is a library used for server watching each file modification.

```
$ npm i -g nodemon
```

**Use**

```
$ nodemon app.js
```

Now `app.js` is being watched for changes.

## Body Parser

When submitted, the form will send information. But in order to use it, we have to install a support library called "BodyParser". It will parse the object that comes in `req.body`.

```
$ npm i body-parser --save
```

## Method Override

HTML does not support requests with verbs different than POST and GET. To do that, a library must be used, which is `methodOverride`.

```
npm i method-override --save
```

## Express Sanitizer

A security layer for input forms.

```
$ npm i --save express-sanitizer
```

### Final setup

```javascript
const express = require("express"),
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  methodOverride = require("method-override"),
  expressSanitizer = require("express-sanitizer"),
  app = express();

// Server and DB setup
// Connects db to rest_blog collection
mongoose.connect("mongodb://localhost:27017/rest_blog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// Allows findByIdAndUpdate() and related methods
mongoose.set("useFindAndModify", false);
// Set default view engine to ejs
app.set("view engine", "ejs");
// App will use public directory as default root
app.use(express.static("public"));
// Parse information that comes from forms
app.use(bodyParser.urlencoded({ extended: true }));
// Allow use of sanitizer method, to minimize user abuse on forms
app.use(expressSanitizer());
// Override methods by adding parameter to URL
app.use(methodOverride("_method"));
```
