const db = require("../models");
const User = require('../models/User');
// const mongojs = require("mongojs");

exports.register = function (req, res){

    // will find the user if exists
    db.User.findOne({
        'username': req.body.username
    }).then(result => {

        // if not not null, send json with duplicatedUser as true
        if (result){
            res.json({
                duplicateUser: true
            });
        } else {

        // if there is no user with that email create the user using Schema
        var newUser         = new User();

        // set the user's local credentials
        newUser.username    = req.body.username;
        newUser.password    = newUser.generateHash(req.body.password);

        // save the user
        newUser.save()
        .then(function() {
            //redirect to root HTML
            res.send({redirect: '/'});
        }).catch(function(err) {
            res.json(err);    
        });
        }

    }).catch(err =>{
        res.status(401).json(err);
    });
};

exports.login = function (req,res){
    res.json(req.user);
};

exports.logout = function (req, res){
    req.logout();
    res.redirect("/");
};