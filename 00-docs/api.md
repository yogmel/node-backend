[Go back to Summary](./../README.md);

# API

Short for Application Programming Interface, it is an interface for code to talk to one another.

## XML and JSON

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

## Request Promise

To perform a request, we need to install `request-promise`.

```
$ npm i --save request-promise
```

```javascript
const request = require("request-promise");

app.get("/results", (req, res) => {
  const query = req.query.search;
  request(`http://www.omdbapi.com/?s=${query}&apikey=thewdb`)
    .then((json) => {
      const data = JSON.parse(json);
      res.render("results", { data });
    })
    .catch((err) => {
      console.log(err);
    });
});
```

---

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

---
