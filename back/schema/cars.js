"use strict";
var mongoose = require("mongoose"); // create a schemavar
var car = new mongoose.Schema({
  modelName: String,
  cars: [
    {
      name: String,
      price: String,
      img: String,
    },
  ],
});
var Cars = mongoose.model("car", car);
module.exports = Cars;
