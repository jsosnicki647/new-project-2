const connection = require("../../config/db_config")

const orm = {
    selectTopTen: (cb) => {
        let statement = "SELECT a.activityDescription, COUNT(activityID) as 'count' FROM bridge as b LEFT JOIN activities as a on b.activityID = a.ID GROUP BY activityID ORDER BY 2 DESC, 1 ASC LIMIT 10"
        connection.query(statement, (err, data) => {
            if (err) throw err
            console.log(data)
            cb(data)
        })
    },
    selectAUsersItems: (id, isComplete, cb) => {
        let statement = "SELECT activityID, a.activityDescription, b.completeByDate FROM bridge as b LEFT JOIN activities as a on a.id = b.activityID WHERE b.userID = " + id + " and completed = " + isComplete + " ORDER BY completeByDate"
        connection.query(statement, (err, data) => {
            if (err) throw err
            console.log(data)
            cb(data)        
        })
    },
    insertIntoBridgeTable: (userID, activityID, completeBy, cb) => {
        let statement = "INSERT INTO bridge (userID, activityID, completeByDate) VALUES (?,?,?)"
        connection.query(statement, [userID, activityID, completeBy], (err, data) => {
            if (err) throw err
            console.log(data)
            cb(data)
        })
    },
    selectUser: (userID, cb) => {
        let statement = "SELECT firstName, lastName, userName, zip, lat, lon FROM users WHERE id = " +  userID
        connection.query(statement, (err, data) => {
            if (err) throw err
            console.log(data)
            cb(data)
        })
    },
    nearbyUsersWithSameInterests: (userID, activityID, cb) => {
        orm.selectUser(userID, (data1) => {
            let userLat = data1[0].lat
            let userLon = data1[0].lon
            let statement = "SELECT userName, lat, lon, zip FROM users WHERE id in (SELECT userID FROM bridge WHERE activityID = " + activityID + " AND userID != " + userID + ")"

            connection.query(statement, (err, data2) => {
                if (err) throw err
                for (i=0; i<data2.length; i++) {
                    data2[i].distance = getDistanceFromLatLonInMi(data2[i].lat, data2[i].lon, userLat, userLon)
                }
                data2.sort((a, b) => (a.distance > b.distance) ? 1 : -1)
                console.log(data2)
                cb(data2)
            })
        })
    }
}

module.exports = orm

function getDistanceFromLatLonInMi(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d/1.609;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}
