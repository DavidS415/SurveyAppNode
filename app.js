var express = require("express");
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
const dotenv = require("dotenv");
dotenv.config();
var mongoose = require("mongoose");
const database = process.env.MONGOLAB_URI;
mongoose.Promise = global.Promise;
mongoose
    .connect(database)
    .then(() => console.log('Database Connected'))
    .catch(err => console.log(err));

app.use('/', require('./controllers/survey'));

app.listen(port, () => {
    console.log("Server listening on port " + port);
});