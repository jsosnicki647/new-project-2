const db = require("../models");
const orm = require("../orm")

module.exports = function (app) {
  //get top 10 bucket list items
  app.get("/api/top", (req, res) => orm.selectTopTen((data) => res.json(data)))
  
  //get a specific user's item list
  app.get("/api/useritems", (req, res) => orm.selectAUsersItems(req.body.userID, req.body.isComplete, (data) => res.json(data)))

  //get data for a specific user
  app.get("/api/user/:id", (req, res) => orm.selectUser(req.params.id, (data) => res.json(data)))

  //find nearby users with one of your bucket list items
  app.get("/api/nearbyusers/:uID/:aID", (req, res) => orm.nearbyUsersWithSameInterests(req.params.uID, req.params.aID, (data) => res.json(data))) 

  app.get("/api/email/:id", (req, res) => orm.getEmail(req.params.id, (data) => res.json(data)))
  // add new user
  app.post("/api/adduser", (req, res) => orm.addUser(req.body.id, req.body.firstName, req.body.lastName, req.body.username, req.body.email, req.body.zip, req.body.lat, req.body.lon, (data) => res.json(data)))


    // db.Users.create({
    //     id: req.body.id,
    //     firstName: req.body.firstName,
    //     lastName: req.body.lastName,
    //     userName: req.body.userName,
    //     email: req.body.email,
    //     zip: req.body.zip,
    //     lat: req.body.lat,
    //     lon: req.body.lon
    //   })
    //   .then((data) => res.json(data))
  

  // add new item to bucket list
  app.post("/api/newitem", (req, res) => {
    db.Activities.findAll({
        where: {
          activityDescription: req.body.item
        }
      })
      .then((data1) => {
        //add new item to activities table if not already present
        if (data1.length == 0) {
          db.Activities.create({
              activityDescription: req.body.item,
              category: req.body.type
            })
            .then(() => {
              db.Activities.findAll({
                  where: {
                    activityDescription: req.body.item
                  }
                })
                .then((data2) => {
                  newActivityID = data2[0].id
                  orm.insertIntoBridgeTable (req.body.userid, newActivityID, req.body.deadline, (data) => res.json(data))
                })
            })
        }
        else {
          activityID = data1[0].id
          orm.insertIntoBridgeTable (req.body.userid, activityID, req.body.deadline, (data) => res.json(data))
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
    db.Bridge.update({
        completed: 1,
        completedOnDate: today
      }, {
        where: {
          userID: req.body.userID,
          activityID: req.body.activityID
        }
      })
      .then((data) => {
    console.log("today: " + today)
        res.json(data)
      })
  })
}