//use of mongoose
const mongoose = require("mongoose");

/*
 * Redirection contain :
 * - toUrl : the original url that is shorten.
 * - fromUrlKey : the 5 characters string randomly generated which allow
 * DOMAIN_NAME/:fromUrlKey (shorten url) to redirect to toUrl value.
 * - visitsCounter : the number of time the shorten url has been used
 */

const Redirection = mongoose.model("Redirection", {
  toUrl: {
    type: String,
    required: true,
    unique: true
  },
  fromUrlKey: {
    type: String,
    required: true,
    unique: true
  },
  visitsCounter: {
    type: Number,
    required: true
  }
});

module.exports = Redirection;
