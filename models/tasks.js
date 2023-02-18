const express = require("express");
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    name: {type:String, required:true},
    description: String,
    deadline: String,
    assignedTo: String,
    completed: Boolean
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;