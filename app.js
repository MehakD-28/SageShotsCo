const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.engine('ejs', ejsMate);


const reviews = [
    { name: "Pavit", review: "We hired Mehak at Sage Shots Co for a photoshoot and my Rokha event. Working with Mehak was honestly the best decision ever. She was so sweet, the kindest soul to work with, and so accommodating with everything I needed. She made us feel so comfortable in front of the camera. She captured every special moment so beautifully. I can’t recommend Sage Shots Co enough. I’m so grateful I found her and can’t wait to work with her again." ,
        videoSrc: "/videos/pavan.mp4"
    },
    { name: "Japneet", review: "I booked Mehak for my brother’s wedding and my engagement! I highly recommend her if you want to enjoy your event and have all the moments captured perfectly for you to look back at! Mehak did an amazing job capturing all the moments perfectly and she goes above and beyond to make sure everything is how you want it! Without a second thought, I’ll be booking Sage Shots Co again for my pre-wedding events!",
        videoSrc: "/videos/japneet.mp4"
     },
    { name: "Simran", review: "Thank you soooooo much for all your help capturing our wedding week! We and everyone else enjoyed the content so much, I’m really happy we chose your service. You were so sweet, helpful, and professional. I really appreciate you! I’ve been watching these videos every day since the wedding and I feel like I’m actually there.",
        videoSrc: "/videos/simran.mp4"
     },
    { name: "Simrat", review: "Thank you for literally everything. It didn’t feel like you were a vendor at my wedding—it felt like you were a sister taking videos! I absolutely loved everything you did and will forever be watching the videos and eventually get to show my kids these amazing memories!",
        videoSrc: "/videos/simrat.mp4"
     },
  ];

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
    res.render("home", { reviews });
});


app.listen(8080, () => {
    console.log("listening to the port");
});