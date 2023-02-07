const express = require("express");
const app = express();
const port = 5000;
const mongoose = require("mongoose");
const { all } = require("bluebird");
const Cars = require("./schema/cars");
const cors = require("cors");
const { request, response } = require("express");
const uri =
  "mongodb+srv://mba:saKppmWyiOhaVYpR@cluster0.xfyfef4.mongodb.net/?retryWrites=true&w=majority";
mongoose.set("strictQuery", false);
mongoose.connect(
  uri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("successs");
  }
);

app.use(cors());
app.get("/", (reqeust, response) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  Cars.find({}, (err, res) => {
    if (err !== null) {
      response.status(500).send("ERROR");
    } else if (res.length == 0) {
      response.status(404).send("NO DATA");
    } else {
      let backdata = JSON.parse(JSON.stringify(res));
      response.status(200).send(backdata);
    }
  });

  // res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
