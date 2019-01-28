var Pool = require('pg-pool')
var Promise = require('promise');

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

        getUser: function(userName, password) {
           
            return new Promise(function(resolve, reject) {				
				pool.connect().then(client => {	

					client.query('select 1 as name').then(res => {						
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