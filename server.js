const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const md5 = require("md5");
// const ejs = require("ejs");
// const cors = require("cors");
const Task = require("./models/tasks");
const User = require("./models/users");
const Admin = require("./models/admins");


const app = express();
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));
// app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var authID; // email

mongoose.connect('mongodb://127.0.0.1:27017/emprove');

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/home.html");
});

app.post("/sign-up", (req, res) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: md5(req.body.password)
    });
    newUser.save((err) => {
        if (err) {
            res.redirect("sign-up.html");
        }
        else {
            Admin.findOne({ email: "admin@gmail.com" }, (err, foundAdmin) => {
                if (foundAdmin) {
                    foundAdmin.users.push(req.body.email);
                    foundAdmin.save();
                }
            });
            res.redirect("home.html");
        }
    });
});

app.post("/sign-in", (req, res) => {
    let email = req.body.email;
    let password = md5(req.body.password);

    User.findOne({ email: email }, (err, foundUser) => {
        if (err) {
            res.redirect("sign-in.html");
        }
        if (foundUser) {
            if (foundUser.password === password) {
                authID = email;
                res.render("user-dashboard");
            }
            else {
                res.redirect("sign-in.html");
            }
        }
    });
});

app.post("/admin-signin", (req, res) => {
    let email = req.body.email;
    let password = md5(req.body.password);

    Admin.findOne({ email: email }, (err, foundAdmin) => {
        if (err) {
            res.redirect("admin-signin.html");
        }
        if (foundAdmin) {
            if (foundAdmin.password === password) {
                authID = email;
                Admin.findOne({ email: authID }, (err, adminDetails) => {
                    if (adminDetails) {
                        res.render("admin-dashboard", { details: adminDetails })
                    }
                });
            }
            else {
                res.redirect("admin-signin.html");
            }
        }
    });
});

app.get("/admin-to-user/:id", (req, res) => {
    let email = req.params.id;
    User.findOne({ email: email}, (err, foundUser) => {
        if (err) {
            res.render("admin-dashboard");
        }
        if (foundUser) {
            authID = email;
            res.render("user-dashboard");
        }
    });
});

app.get("/api/tasks", (req, res) => {
    Task.find({ assignedTo: authID }, (err, userTasks) => {
        if (userTasks) {
            res.json(userTasks);
        }
    });
});

app.get("/api/users", (req, res) => {
    User.findOne({ email: authID }, (err, userDetails) => {
        if (userDetails) {
            res.json(userDetails);
        }
    });
});

app.post("/create-task", (req, res) => {
    Task.create({
        name: req.body.name,
        description: req.body.description,
        deadline: req.body.deadline,
        assignedTo: authID

    }, (err, insertedObj) => {
        if (!err) {
            res.send(insertedObj);
        }
    });

});

app.post("/update-task", async (req, res) => {
    await Task.findByIdAndUpdate(req.body._id, {
        name: req.body.name,
        description: req.body.description,
        deadline: req.body.deadline
    });
    res.send("Updated successfully");
});

app.delete("/task/:id", async (req, res) => {
    await Task.findByIdAndDelete(req.params.id)
    res.send("Deleted successfully");
});

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});