const express = require("express");
const app = express();
const port = process.env.port || 5001;
const mongoose = require("mongoose");
const Cars = require("./schema/cars");
const cors = require("cors"); //secure
const { request, response } = require("express");
const uri =
  "mongodb+srv://mba:saKppmWyiOhaVYpR@cluster0.xfyfef4.mongodb.net/?retryWrites=true&w=majority"; // url
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
  response.status(200).send("Welcome");
});
app.get("/cardata", (reqeust, response) => {
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
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
