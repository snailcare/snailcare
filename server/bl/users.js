var express = require('express');
var router = express.Router();
var db = require('../dal');
var Promise = require('promise');
const {SHA256} = require('sha2');
var logger = require('../logger');

module.exports = {
	
	login: function(userName, password) {	
	
		return new Promise(function(resolve, reject) {			
			hash = SHA256(password).toString("hex");			
			db.UserFunctions.getUser(userName, hash)
			.done(function(user){		
				resolve(user);
			},function(e){
				reject(e);
			});			
		});	
		
	}
	
};