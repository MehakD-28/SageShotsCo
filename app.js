const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.engine('ejs', ejsMate);


app.get("/photography", (req,res) => {
    res.render("photography");
});

app.get("/about", (req,res) => {
    res.render("about");
});

app.get("/services", (req,res) => {
    res.render("services");
});

app.get("/inquire", (req,res) => { 
    res.render("inquire");
});

app.get("/", (req,res) => {
    res.render("home");
});


app.listen(8080, () => {
    console.log("listening to the port");
});