const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
    name: String,
    email: String,
    phoneNumber: Number,
    interestLevel: Number,
    visaNeeded: Boolean,
    visa: String,
    codingLanguages: Array,
});
const Result = mongoose.model("results", resultSchema);
module.exports = Result;