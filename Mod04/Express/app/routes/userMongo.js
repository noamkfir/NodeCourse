var express = require('express');
var users = require('../models/usersMongo');

var router = express.Router();

router.get("/", function(req, res) {

    users.service.all(function(err, _users) {
        if (err)
            next(err);
        else
            res.render("users", {users: _users});
    });
});

router.route("/register")
    .get(function(req, res) {
        res.render("register");
    })
    .post(function(req, res, next) {
        users.service.save(req.body.username, req.body.email, req.body.password, function(err, data) {
            if (err)
                next(err);
            else
                res.redirect('/users');
        });

    });

router.route("/login")
    .get(function(req, res) {
        res.render("login");
    })
    .post(function(req, res) {
        var user = users.service.login(req.body.email, req.body.password, function(err, user) {
            if (user != null) {
                req.session.user = user;
                res.redirect("/users");
            }
            else {
                res.render("login", {error: "Wrong Email or password"})
            }
        });

    });

module.exports = router;