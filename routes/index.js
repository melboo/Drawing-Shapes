var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Users = require('./../models/cord');

router.get('/', function(req, res) {
		//ask for everything of the collection
    Users.find(function (err, users) {
        if (err) {
        console.log(err);
        } else {
            res.render('index', {
                title: 'Coordinates',
                users: users
            });
        }
    });
});


module.exports = router;
