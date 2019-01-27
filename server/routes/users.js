var express = require('express');
var router = express.Router();
var db = require('../dal');
var Promise = require('promise');
const {SHA256} = require('sha2');


router.post('/login', function(req,res){
	console.info('new login request!');
	var userName = req.body.userName;
	var password = req.body.password;
	hash = SHA384(password, 'hex');
	console.log('userName: ' + userName + ', password: ' + password);	
	db.UserFunctions.getUser(userName, hash)
	.done(function(user){		
		res.json({status: true, user: user}));
	},function(err){
		res.json({status: false});
	});
});

module.exports = router;
