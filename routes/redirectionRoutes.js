const express = require("express");
const router = express.Router();

const randomstring = require("randomstring");

//Call necessary model
const Redirection = require("../models/Redirection");

/*
 * CRUD requirements :
 * Create Redirection : required
 * Read one or all Redirection : required
 * Update Redirection : require to modify visitsCounter
 * Delete Redirection : not mandatory
 */

//Create : new shortenUrl

router.post("/redirection/create", async (req, res) => {
  try {
    //console.log("creation of a redirection entry");

    // generate random key of 5 chars
    let randomString = randomstring.generate(5);

    //console.log(req.body);
    //new entry in the bd
    const redirection = new Redirection({
      toUrl: req.body.toUrl, // url sent
      fromUrlKey: randomString, //unique key
      visitsCounter: 0 // not visited yet
    });

    console.log(redirection);
    await redirection.save(); // will thought an error if random key already exist. 1 odd over 62^5
    return res.json({
      //_id: redirection._id,
      toUrl: redirection.toUrl,
      fromUrlKey: redirection.fromUrlKey,
      visitsCounter: redirection.visitsCounter
    });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "An error occurred at redirection creation : ", error });
  }
});

// Read : all redirection

router.get("/redirection", async (req, res) => {
  try {
    const redirection = await Redirection.find();
    res.status(200).json(redirection);
  } catch (error) {
    res
      .status(400)
      .json({ message: "An error occurred at reading redirections: ", error });
  }
});

//Update : confirm key exist in the database and update the counter of visits

router.post("/redirection/update", async (req, res) => {
  try {
    const redirection = await Redirection.findOneAndUpdate(
      {
        fromUrlKey: req.body.fromUrlKey // find object with the right "fromUrlKey"
      },
      { $inc: { visitsCounter: 1 } } // increment the number of visits by one
    );
    if (redirection === null) {
      res.status(401).json({
        message: "specified short url doesnot exist ",
        error
      });
    }
    res.status(200).json(redirection);
  } catch (error) {
    res.status(400).json({
      message:
        "An error occurred at updating the counter of visit of the specified url: ",
      error
    });
  }
});

module.exports = router;
