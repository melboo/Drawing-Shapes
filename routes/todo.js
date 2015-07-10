var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Comp = require('./../models/cord');


//normal visit
router.get('/api/todo', function(req, res) {
// get entries database mongoose
    Comp.find(function(err, todos) {

        if (err){
            res.send(err);
        }else {
            //return all entries json format
            res.json('todo', todos);
		}
		});
});

//create comp
router.post('/', function(req, res) {
	//ajax request object / create entry
	Comp.create({
		text : req.body.text,
		g1X : req.body.g1X,
		g1Y : req.body.g1Y,
		g1jX : req.body.g1jX,
		g1jY : req.body.g1jY,
		g1dirc : req.body.g1dirc,
		g1Jradius : req.body.g1Jradius,
		g1outerR : req.body.g1outerR,
		g2X : req.body.g2X,
		g2Y : req.body.g2Y,
		g2jX : req.body.g2jX,
		g2jY : req.body.g2jY,
		g2dirc : req.body.g2dirc,
		g2Jradius : req.body.g2Jradius,
		g2outerR : req.body.g2outerR,
		jX : req.body.jX,
		jY : req.body.jY,
		done : false
	}, function(err, todo){
		if(err){
			res.send(err);
		}

		//return all
		Comp.find(function(err, todos){
			if(err){
				res.send(err);
			}else{
				res.json('todo', todos);
			}
		});
	});
});

//delete an entry
router.delete('/api/todo/:todo_id', function(req, res){
	Comp.remove({
		_id : req.params.todo_id
	}, function(err, todo){
		if(err){
			res.send(err);
		}else {
			//return all 
			Comp.find(function(err, todos){
				if(err){
					res.send(err);
				}else {
					res.json(todos);
				}
			});
		}
	});
});

//select
router.get('/api/todo/:todo_id', function(req, res){
	Comp.find({
		_id : req.params.todo_id
	}, function(err, todos){
			res.send(todos);
		
	});
});




module.exports = router;