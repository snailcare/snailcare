var express = require('express');
var router = express.Router();
var db = require('../dal');
var Promise = require('promise');
const {SHA256} = require('sha2');
var logger = require('../logger');

module.exports = {
	
	login: function(id, password) {	
	
		return new Promise(function(resolve, reject) {			
			hash = SHA256(password).toString("hex");
			db.UserFunctions.getUser(id, hash)
			.done(function(data){
				resolve((data.length) ? true : false);
			},function(e){
				reject(e);
			});			
		});	
		
	}
	
};