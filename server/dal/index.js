var Pool = require('pg-pool')
var Promise = require('promise');
var logger = require('../logger');

var pool = new Pool({
	host: 'baasu.db.elephantsql.com',
	database: 'qbyovcvu',
	user: 'qbyovcvu',
	password: 'H6x2eyjtYTbgMOLSpK405aBVy07lO1B1',
	port: 5432,
	ssl: true,
	max: 100,
	idleTimeoutMillis: 999999,
	connectionTimeoutMillis: 999999
});


module.exports = {

    UserFunctions: {       

        getUser: function(id, password) {
           
            return new Promise(function(resolve, reject) {				
				pool.connect().then(client => {	
					query = `select id from snailcare.users where id = '${id}' and password = '${password}' limit 1`;
					logger.info(`running: ${query}`);
					client.query(query).then(res => {								
						client.release()
						resolve(res.rows);
					})
					.catch(e => {						
						client.release();						
						reject(e);
					})
					
				})
            });
			
        }
		
    }
	
};