var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Users = require('./../models/posts');


router.get('/', function(req, res) {
	res.render('add_posts', {title: 'Add new Post'});
});

router.post('/', function(req, res){
	var post = new Users({
        //get the body params from "name" attribute of the form
        title: req.body.post_title,
        body: req.body.post_body,
        slug: req.body.post_slug
        //title:

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