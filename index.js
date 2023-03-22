const express = require("express");
const bodyParser = require("body-parser")
const ejs = require("ejs")


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"))


app.get("/", function(req, res){
    res.render("index");
})

app.get("/Colba", function(req, res){
    res.render("Colba")
})

app.get("/Solstego", function(req, res){
    res.render("Solstego")
})

app.listen(3000, function(req, res){
    console.log("uhu")
})