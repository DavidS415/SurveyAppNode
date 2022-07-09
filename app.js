var express = require("express");
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
const dotenv = require("dotenv");
dotenv.config();

const database = process.env.MONGOLAB_URI;
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect(database);
var nameSchema = new mongoose.Schema({
    name: String,
    email: String,
    phoneNumber: Number,
    interestLevel: Number,
    visaNeeded: Boolean,
    visa: String,
    codingLanguages: Array,
});
var Result = mongoose.model("results", nameSchema);

app.get("/", function (req, res) {
    res.render("index",{ details: null });
})

app.get("/form", function (req, res) {
    res.render("form");
})

app.get("/getdetails", function (req, res) {   
    Result.find({}, function (err, allDetails) {
        if (err) {
            console.log(err);
        } else {
            res.render("index", { details: allDetails })
        }
    })
})

app.use(express.static(__dirname + "/static"));

app.post("/submit", (req, res) => {
    var myData = new Result(req.body);
    myData.save()
        .then(item => {
            res.render("index",{ details: null })
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
});

app.listen(port, () => {
    console.log("Server listening on port " + port);
});