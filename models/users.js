const express = require("express");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type:String, required:true},
    password: {type:String, required:true},
    pomodoroCount: {type: Number, default: 0},
    drowsinessCount: {type: Number, default: 0},
    workStressScore: {type: Number, default: 0},
    pomodoroCountArray: {type: [Number]},
    drowsinessCountArray: {type: [Number]},
    workStressScoreArray: {type: [Number]},
    timestampArray: {type: [String]}
});

const User = mongoose.model('User', userSchema);

module.exports = User;