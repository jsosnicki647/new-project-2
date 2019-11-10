// var db = require("../models");
// var path = require("path")
const orm = require("../orm")
module.exports = function(app) {
  // Load index page

  app.get("/profile/:id", (req, res) => {
    let hbsobj = {}
    orm.selectAUsersItems(req.params.id, (myItemsData) => {
      hbsobj.myitems = myItemsData
      orm.selectTopTen((topItemsData) => {
        hbsobj.topitems = topItemsData  
        // console.log(hbsobj)
        res.render("profile", hbsobj)
      })
    })
  })

 app.get("/", (req, res) => res.render("login",{}))
  
    

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.send("404");
  });


// nodemailer

app.post("/form", (req, res) => {

  var email = req.body.email;
  // var message = req.body.message
  var name = req.body.name;
  
  console.log("email: " + email, "name: " + name)
  
  const output =`<p> You have a new contact request </p>
      <P> 😎Thank you for joing the squad 😎</p>
      <p>From: ${req.body.fromUser}</p>
      <p>Interest: ${req.body.interest}</p>
      <p>${req.body.message}</p>
      </ul>`;
  
  const nodemailer = require('nodemailer');
  
  let transporter =  nodemailer.createTransport({
      service : "gmail",
  
      auth: {
          user: "bucketlistusa271@gmail.com",
          pass: process.env.EMAIL_PW
      }
  });
  
  
  
  let mailoptions  = {
      from: "bucketlistusa271@gmail.com", // sender address
      to: `${email}`, // list of receivers
      subject: 'registration ✔', // Subject line
      text: `Hey ${name}`, // plain text body
      html: output
  };
  
  transporter.sendMail(mailoptions, (err, data) =>{
  if (err){
      console.log(err)
  }else{ console.log("email sent")}
  });
  
  
    res.send("its okay")
  })
};