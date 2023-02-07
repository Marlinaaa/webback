const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
// const { all } = require("bluebird");
const { json } = require("express");
const uri =
  "mongodb+srv://mba:saKppmWyiOhaVYpR@cluster0.xfyfef4.mongodb.net/?retryWrites=true&w=majority";

const car = require("./schema/cars");

mongoose.set("strictQuery", false);
mongoose.connect(
  uri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("successs");
  }
);

let _data = [];

const fs = require("fs");

const data = fs.readFileSync("./Data.json", "utf-8");
let dats = JSON.parse(data);
var removePromises = [car.deleteMany({})];

Promise.all(removePromises)
  .then(function () {
    dats.map((item, index) => {
      car
        .create({
          modelName: item.modelName,
          cars: item.cars,
        })
        .then((obj) => {
          obj.save();
          console.log("success");
        })
        .catch((err) => {
          console.log(err);
        });
    });
  })
  .catch(function (err) {
    console.error("Error create schemaInfo", err);
  });
