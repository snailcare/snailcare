var express = require('express');
var router = express.Router();
let users = require('../bl/users');
var logger = require('../logger');


//TODO: change to POST
router.get('/login', function(req, res){
	logger.info('route: /login');
	//var id = req.body.id;
	//var password = req.body.password;	
	var id = 'aaa';
	var password = '1234';	
	users.login(id, password).done(function(data){
		req.session.id = (data) ? id : undefined;
		res.json({status: true, is_exists: data});
	},function(e){
		res.json({status: false, error: e});
	});	
});

module.exports = router;
