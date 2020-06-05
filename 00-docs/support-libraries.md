[Go back to Summary](./../README.md);

# Support libraries

## Nodemon

Nodemon is a library used for server watching each file modification.

```
$ npm i -g nodemon
```

## Body Parser

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

## Method Override

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
