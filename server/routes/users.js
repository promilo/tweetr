const express = require("express");
const userRoutes  = express.Router();

module.exports = function(DataHelpers) {

  userRoutes.post("/register", (req, res) => {

    DataHelpers.registerUser(req.body.name, req.body.handle, req.body.pass, req, res, () => {
      console.log("good")
    });
    res.send("200")
    /*let user = {};
    let name = req.params.name;
    let userHandle = req.params.userHandle;
    //TODO: Check if Userhandle is unique.
    if (userHandle === ""){
      res.sendStatus("400");
      return;
    }
    let new_password = req.params.password;
    if (new_password === ""){
      res.sendStatus("400");
      return;
    }
    let user_email = req.parems.email;
    if (email === ""){
      res.sendStatus("400");
      return;
    }
    let avatars = "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png"
    req.session.userHandle = userHandle;
    user["name"] = name;
    user["userHandle"] = userHandle;
    user["password"] = new_password;
    req.session.userHandle = userHandle;
    res.redirect("/");
    */
  })

  userRoutes.post("/login", (req, res) => {


  })

  userRoutes.post("/logout", (req, res) => {
    req.session = null;
    res.redirect('/');
  })

  return userRoutes;

}
