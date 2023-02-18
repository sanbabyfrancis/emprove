const express = require("express");
const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    name: String,
    password: String,
    users: [String]
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;