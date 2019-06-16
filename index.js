const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());

//Connect to DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/shortenurl",
  {
    useNewUrlParser: true
  },
  function(err) {
    if (err) console.error("Could not connect to mongodb.");
  }
);

//declare route(s)
const redirectionRoutes = require("./routes/redirectionRoutes");
app.use(redirectionRoutes);

//Let's go!
app.listen(process.env.PORT || 3001, () => {
  console.log("Server started");
});
