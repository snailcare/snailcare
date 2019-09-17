var db = require('../dal');
var Promise = require('promise');
var logger = require('../logger');

module.exports = {
	
	getUsersAnalytics: function() {	
	
		return new Promise(function(resolve, reject) {			
			db.AnalyticsFunctions.getUsersAnalytics()
				.done(function(data){
					resolve(data);
				},function(e){
					reject(e);
			});
		});
		
	}
	
};