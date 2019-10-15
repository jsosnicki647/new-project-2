const mysql = require("mysql");
require('dotenv').config()

if (process.env.JAWSDB_URL){
  var connection = mysql.createConnection(process.env.JAWSDB_URL)
}
else{
  var connection = mysql.createConnection({
  host: "localhost",
  port: process.env.PORT || 3306,
  user: "root",
  password: "Jeannie63",
  database: "bucket_besties_db"
});
}

module.exports = connection