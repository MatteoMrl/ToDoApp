var express = require("express");
const fs = require("fs");
var app = express();
var bodyParser = require('body-parser'); //to parse the body of the request
var todoUrl = __dirname + "/public/assets/todoList.json";

var urlencodeParser = bodyParser.urlencoded({ extended: false });

var todoController = require("./controllers/todoController.js")

//I use the MVC architecture

//template engines
app.set("view engine", "ejs");

//static files
app.use(express.static("./public"));

//I call the imported function with parameter "app" so it can perform any function of express, fs for filesystem,
//urlencodeParser to handle the req body and todoUrl for the url of todoList.json 
todoController(app,fs,urlencodeParser,todoUrl);


app.listen(3000, ()=>{
    console.log("Now listening on port 3000...");
})