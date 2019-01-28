var express = require('express');
var router = express.Router();
let users = require('../bl/users');
var logger = require('../logger');


//TODO: change to POST
router.get('/login', function(req, res){
	logger.info('running: /login');
	//var userName = req.body.userName;
	//var password = req.body.password;	
	var userName = 'a124';
	var password = 'a12456';	
	users.login(userName, password).done(function(user){		
		res.json({status: true, user: user});
	},function(e){
		res.json({status: false, error: e});
	});	
});

module.exports = router;
