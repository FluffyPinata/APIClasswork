"use strict";

var courses = [
    {
        title: "Raspberry Cake",
        cost: 50
    },
    {
        title: "Artichoke",
        cost: 50
    },
    {
        title: "Burger",
        cost: 100
    }

]

module.exports = {
    index: (req, res) => {
        res.render("index"); 
    },
    contact: (req,res) => {
        res.render("contact");
    },
    courses: (req, res) => {
        res.render("courses");
    }
}