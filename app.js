var express = require("express");
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("<mongodbserverlocation>");
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

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/form.html");
});

app.post("/submit", (req, res) => {
    var myData = new Result(req.body);
    myData.save()
        .then(item => {
            res.sendFile(__dirname + "/view.html");
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
});

app.listen(port, () => {
    console.log("Server listening on port " + port);
});