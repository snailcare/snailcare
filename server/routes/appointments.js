var express = require('express');
var router = express.Router();
let appointments = require('../bl/appointments');
var logger = require('../logger');

router.use(function (req, res, next) {	
	if (!req.session.name){
		res.json({status: false, error: "Session is empty"});
		return;
	}	
	next();
});

//TODO: change to POST
router.get('/login', function(req, res){
	logger.info('route: /login');
	//var id = req.body.id;
	//var password = req.body.password;	
	var id = 'aaa';
	var password = '1234';	
	appointments.login(id, password).done(function(data){
		req.session.id = (data) ? id : undefined;
		res.json({status: true, is_exists: data});
	},function(e){
		res.json({status: false, error: e});
	});	
});

module.exports = router;
