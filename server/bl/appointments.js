var db = require('../dal');
var Promise = require('promise');
var logger = require('../logger');

module.exports = {
	
	login: function(id, password) {	
	
		return new Promise(function(resolve, reject) {			
			hash = SHA256(password).toString("hex");
			db.AppointmentsFunctions.getUser(id, hash)
			.done(function(data){
				resolve((data.length) ? true : false);
			},function(e){
				reject(e);
			});			
		});	
		
	}
	
};