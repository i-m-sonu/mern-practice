const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect("mongodb://localhost:27017/test");
var db = mongoose.connection;
app.post("/signup", (req, res) => {
  var name = req.body.name;
  var email = req.body.email;
  var data={
    "name":name,
    "email": email
  }
  db.collection("test1").insertOne(data,(err,collection)=>{
    if(err){
        throw err;
    }
    console.log("Record inserted successfully"); 
  })
  return res.redirect('main.html');
});

app
  .get("/", (req, res) => {
    res.set({
      allow_access_allow_origin: "*",
    })
    return res.redirect('index.html');
  })
  .listen(3000);
