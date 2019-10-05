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
	
	getNextFreeAppointments: function() {	
	
		return new Promise(function(resolve, reject) {			
			db.AppointmentsFunctions.getNextFreeAppointments()
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
		
	},
	
	getPreviousAppointmentsById: function(id) {	
	
		return new Promise(function(resolve, reject) {			
			db.AppointmentsFunctions.getPreviousAppointmentsById(id)
				.done(function(data){
					resolve(data);
				},function(e){
					reject(e);
			});
		});
		
	},
	
	getNextAppointmentsById: function(id) {	
	
		return new Promise(function(resolve, reject) {			
			db.AppointmentsFunctions.getNextAppointmentsById(id)
				.done(function(data){
					resolve(data);
				},function(e){
					reject(e);
			});
		});
		
	},
	
	scheduleAppointment: function(staffId, date, hour, clientId) {	
	
		return new Promise(function(resolve, reject) {	

			if (!staffId || !date || !hour || !clientId) {
				logger.info('input is not valid');
				reject({'error': 'input_not_valid'});
				return;
			}

			db.AppointmentsFunctions.isClientAlreadyScheduledAppointment(date, clientId, hour, staffId).done(function(data){		
		
				if (data.result && parseInt(data.result)) {
					logger.info('scheduleAppointment - already_exists')
					resolve({'error': 'already_exists'});
					return;
				}
				
				db.AppointmentsFunctions.isAppointmentAvailable(staffId, date, hour).done(function(data){	

					if (data.result && !parseInt(data.result)) {
						logger.info('scheduleAppointment - something_went_wrong')
						resolve({'error': 'something_went_wrong'});
						return;
					}
				
					db.AppointmentsFunctions.scheduleAppointment(staffId, date, hour, clientId)
						.done(function(data){
							resolve(data);
						},function(e){
							reject(e);
						});	
				},function(e){
					reject(e);
				});		
				
			},function(e){
				reject(e);
			});		
			
		});			
	},
	
	getMessagesById: function(id) {	
	
		return new Promise(function(resolve, reject) {			
			db.AppointmentsFunctions.getMessagesById(id)
				.done(function(data){
					resolve(data);
				},function(e){
					reject(e);
			});
		});
		
	},
	
	rescheduleAppointment: function(staffId, date, hour, clientId, originalHour) {	
	
		return new Promise(function(resolve, reject) {	

			if (!staffId || !date || !hour || !clientId) {
				logger.info('input is not valid');
				reject({'error': 'input_not_valid'});
				return;
			}

			db.AppointmentsFunctions.isClientAlreadyRecheduledAppointment(date, clientId, hour, staffId).done(function(data){		
		
				if (data.result && parseInt(data.result)) {
					logger.info('scheduleAppointment - already_exists')
					resolve({'error': 'already_exists'});
					return;
				}
				
				db.AppointmentsFunctions.isAppointmentAvailable(staffId, date, hour).done(function(data){	

					if (data.result && !parseInt(data.result)) {
						logger.info('scheduleAppointment - something_went_wrong')
						resolve({'error': 'something_went_wrong'});
						return;
					}
				
					db.AppointmentsFunctions.scheduleAppointment(staffId, date, hour, clientId)
						.done(function(data){
							db.AppointmentsFunctions.isExists(staffId, date, originalHour, clientId).done(function(data){								
								if (!(data.result) || !(parseInt(data.result))) {
									logger.info('Something went wrong');
									resolve({'error': 'not_exists'});
									return;
								}
								
								db.AppointmentsFunctions.removeAppointment(staffId, date, originalHour, clientId)
									.done(function(data){
										resolve(data);
									},function(e){
										reject(e);
									});	
							},function(e){
								reject(e);
							});
						},function(e){
							reject(e);
						});	
				},function(e){
					reject(e);
				});		
				
			},function(e){
				reject(e);
			});		
			
		});			
	}
	
};