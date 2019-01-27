var express = require('express');
var router = express.Router();
var db = require('../dal');
var Promise = require('promise');
const {SHA256} = require('sha2');
var logger = require('../logger');

//TODO: change to POST
router.get('/login', function(req,res){
	logger.info('running: /login');
	//var userName = req.body.userName;
	//var password = req.body.password;
	
	var userName = 'a124';
	var password = 'a12456';		
	hash = SHA256(password).toString("hex");
	db.UserFunctions.getUser(userName, hash)
	.done(function(user){		
		res.json({status: true, user: user});
	},function(err){
		res.json({status: false});
	});
});

module.exports = router;
