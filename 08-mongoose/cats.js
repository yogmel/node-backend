const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/cat_app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// define data pattern, but all properties don't need to be filled
const catSchema = new mongoose.Schema({
  name: String,
  age: Number,
  temperament: String,
});

// get the schema and compile into a model, creating an object with methods we use down below
const Cat = mongoose.model("Cat", catSchema);

// creates new object
const george = new Cat({
  name: "Mr. Norris",
  age: 7,
  temperament: "Evil",
});

// save into the database
george.save((err, cat) => {
  if (err) {
    console.log("Something went wrong");
  } else {
    console.log("We just saved a cat");
    console.log(cat);
  }
});

// create method both create the object and save it into the database
Cat.create({
  name: "Mr. Norris",
  age: 7,
  temperament: "Evil",
}, (err, cat) => {
  if (err) {
    console.log("Something went wrong");
  } else {
    console.log("We just saved a cat");
    console.log(cat);
  }
})

Cat.find({}, (err, cats) => {
  if (err) {
    console.log("error: ", err);
  } else {
    console.log("all the cats, ", cats);
  }
});
