// const db = require("../models");
const orm = require("../orm")
const axios = require('axios')
require('dotenv').config()

module.exports = function (app) {
  //get top 10 bucket list items
  app.get("/api/top", (req, res) => orm.selectTopTen((data) => res.json(data)))

  //get a specific user's item list
  app.get("/api/useritems", (req, res) => orm.selectAUsersItems(req.body.userID, req.body.isComplete, (data) => res.json(data)))

  //get data for a specific user
  app.get("/api/user/:id", (req, res) => orm.selectUser(req.params.id, (data) => {
    console.log("HI", data)
    res.json(data)
  }))

  //find nearby users with one of your bucket list items
  app.get("/api/nearbyusers/:uID/:aID", (req, res) => orm.nearbyUsersWithSameInterests(req.params.uID, req.params.aID, (data) => res.json(data)))

  app.get("/api/email/:id", (req, res) => orm.getEmail(req.params.id, (data) => res.json(data)))
  // add new user
  app.post("/api/adduser", (req, res) => {
    var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + req.body.zip + "&key=" + process.env.API_KEY
    axios.get(queryURL)
      .then((response) => orm.addUser(req.body.id, req.body.firstName, req.body.lastName, req.body.userName, req.body.email, req.body.zip, response.data.results[0].geometry.location.lat.toFixed(3), response.data.results[0].geometry.location.lng.toFixed(3), (data) => res.json(data)))
  })


  // add new item to bucket list
  app.post("/api/newitem", (req, res) => {
    orm.findActivity(req.body.item, (data1) => {
      //add new item to activities table if not already present
      if (data1.length == 0) {
        orm.insertActivity(req.body.item, req.body.type, (data2) => {
          console.log("DATA2", data2)
          newActivityID = data2.insertId
          console.log("NEWACTIVITY", newActivityID)
          orm.insertIntoBridgeTable(req.body.userid, newActivityID, req.body.deadline, (data) => res.json(data))
        })
      } else {
        console.log("DATA1: ", data1)
        activityID = data1[0].id
        console.log("ACTIVITYID", activityID)
        orm.insertIntoBridgeTable(req.body.userid, activityID, req.body.deadline, (data) => res.json(data))
      }
    })
  })

  // mark activity as complete
  app.put("/api/complete/", (req, res) => {
    // console.log(req.body);
    var today = new Date()
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    orm.updateBridge(today, req.body.userID, req.body.activityID, (data) => res.json(data))
  })

}