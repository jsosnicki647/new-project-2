var db = require("../models");
var path = require("path")
module.exports = function(app) {
  // Load index page

  app.get("/", (req, res) => res.sendFile(path.join(__dirname, "../public/signup.html")))
    
  app.get("/profile", (req, res) => res.sendFile(path.join(__dirname,"../public/profile.html")))

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.send("404");
  });






// nodemailer

app.post("/form", (req, res, next) => {

  var email = req.body.email;
  
  var name = req.body.name;
  
  console.log(email, name)
  
  const output =`<p> You have a new contact request </p>
      <P> 😎Thank you for joing the squad 😎</p>
      <ul>     
      <li>Name: ${req.body.name}</li>
      <li>email: ${req.body.email}</il>
      </ul>`;
  
  const nodemailer = require('nodemailer');
  
  let transporter =  nodemailer.createTransport({
      service : "gmail",
  
      auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD
      }
  });
  
  
  
  let mailoptions  = {
      from: process.env.EMAIL, // sender address
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
  
  
  // res.send("its okay")
  })
};