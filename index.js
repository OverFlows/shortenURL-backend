const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
/* const helmet = require("helmet");
app.use(helmet()); */

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/shortenurl",
  {
    useNewUrlParser: true
  },

  function(err) {
    if (err) console.error("Could not connect to mongodb.");
  }
);

const redirectionRoutes = require("./routes/redirectionRoutes");
app.use(redirectionRoutes);

app.listen(process.env.PORT || 3001, () => {
  console.log("Server started");
});
