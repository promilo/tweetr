"use strict";
const userHelper = require("./util/user-helper");
// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
        db.collection("tweets").insertOne(newTweet)
        callback(null, true);

    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      db.collection("tweets").find().toArray(callback);
    },

    registerUser: function(name, handle, pass, req, res, callback) {
      if (name === "" || handle === "" || pass === "") {
        callback("empty field")
      } else {
        let newUser = {
          name: name,
          pass: pass,
          handle: handle,
          avatars: userHelper.generateRandomUser().avatars
        }
        console.log(newUser)
        db.collection("users").insertOne(newUser)
      }

    }
  }

};
