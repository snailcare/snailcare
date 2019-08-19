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

router.post('/get_appointments', function(req, res){
	logger.info('route: /get_appointments');	
	if (!req.session.name){
		res.json({status: false, error: "Session is empty"});
		return;
	}
	appointments.getAppointments().done(function(data){		
		res.json({status: true, data: data});
	},function(e){
		res.json({status: false, error: e});
	});	
});

router.post('/remove_appointment', function(req, res){
	logger.info('route: /remove_appointment');
	if (!req.session.name){
		res.json({status: false, error: "Session is empty"});
		return;
	}
	var staffId = req.body.staffId;
	var date = req.body.date;
	var hour = req.body.hour;
	var id = req.body.id;	
	console.log(staffId + " " + date + " " + hour + " "  + id)
	appointments.removeAppointment(staffId, date, hour, id).done(function(data){		
		res.json({status: true, data: data});
	},function(e){
		res.json({status: false, error: e});
	});			
});

module.exports = router;
