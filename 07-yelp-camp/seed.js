// const mongoose = require("mongoose"),
const Campground = require("./models/campgrounds");
const Comment = require("./models/comment");

var data = [
  {
    name: "Cloud's Rest",
    image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    author:{
        id : "588c2e092403d111454fff76",
        username: "Jack"
    }
  },
  {
    name: "Desert Mesa",
    image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    author:{
        id : "588c2e092403d111454fff71",
        username: "Jill"
    }
  },
  {
    name: "Canyon Floor",
    image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    author:{
        id : "588c2e092403d111454fff77",
        username: "Jane"
    }
  },
];

const seedDB = async () => {
  await Campground.deleteMany({})
  .then(() => { console.log("removed campgrounds!") })
  .catch((err) => { console.log(err) });

  await Comment.deleteMany({})
  .then(() => { console.log("removed comments!") })
  .catch((err) => { console.log(err) });

  //add a few campgrounds
  data.forEach(async seed => {
    const campground = await Campground.create(seed);
    const comment = await Comment.create({
      text: "This place is great, but I wish there was internet",
      author: "Homer",
    });
    campground.comments.push(comment);
    campground.save();
  });
}

module.exports = seedDB;
