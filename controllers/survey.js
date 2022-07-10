const express = require('express');
const router = express.Router();
const Result = require("../models/Result");

router.get("/", function (req, res) {
    res.render("index",{ details: null });
})

router.get("/form", function (req, res) {
    res.render("form");
})

router.get("/getdetails", function (req, res) {   
    Result.find({}, function (err, allDetails) {
        if (err) {
            console.log(err);
        } else {
            res.render("index", { details: allDetails })
        }
    })
})

router.post("/submit", (req, res) => {
    var myData = new Result(req.body);
    myData.save()
        .then(item => {
            res.redirect("/getdetails")
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
});

router.get("/delete/:id", (req, res) => {
    const id = req.params.id;
    Result.findByIdAndDelete(id, function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("item deleted");
            res.redirect("/getdetails");
        }
    })
})

module.exports = router;