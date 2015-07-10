var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Users = require('./../models/cord');


router.get('/add_cord', function(req, res) {
	res.render('add_cord', {title: 'Add new Cord'});
});

router.post('/', function(req, res){
	var post = new Users({
        //get the body params from "name" attribute of the form
        title: req.body.cord_title,
        gears: {
        x: req.body.cord_x,
        y: req.body.cord_y
    }

    });

      post.save(function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });

});



module.exports = router;