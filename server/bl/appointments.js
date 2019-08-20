var db = require('../dal');
var Promise = require('promise');
var logger = require('../logger');

module.exports = {
	
	getAppointments: function() {	
	
		return new Promise(function(resolve, reject) {			
			db.AppointmentsFunctions.getAppointments()
				.done(function(data){
					resolve(data);
				},function(e){
					reject(e);
			});
		});
		
	},
	
	removeAppointment: function(staffId, date, hour, id) {	
	
		return new Promise(function(resolve, reject) {	

			if (!staffId || !date || !hour || !id) {
				logger.info('input is not valid');
				reject({'error': 'input_not_valid'});
				return;
			}

			db.AppointmentsFunctions.isExists(staffId, date, hour, id).done(function(data){								
				if (!(data.result) || !(parseInt(data.result))) {
					logger.info('Something went wrong');
					resolve({'error': 'not_exists'});
					return;
				}
				
				db.AppointmentsFunctions.removeAppointment(staffId, date, hour, id)
					.done(function(data){
						resolve(data);
					},function(e){
						reject(e);
					});	
			},function(e){
				reject(e);
			});		
			
		});			
	},
	
	getPreviousAppointments: function() {	
	
		return new Promise(function(resolve, reject) {			
			db.AppointmentsFunctions.getPreviousAppointments()
				.done(function(data){
					resolve(data);
				},function(e){
					reject(e);
			});
		});
		
	}
	
};