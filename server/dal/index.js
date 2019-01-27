
var Promise = require('promise');


module.exports = {

    UserFunctions: {       

        getUser: function(userName, password) {
           
            return new Promise(function(resolve, reject) {
                var query = Users.findOne({ 'userName': userName, 'password': password });

                query.exec(function(err, user) {
                    if (err) {
                        console.log(err);
                        reject(err);
                    }
                    if (user != null) {
                        resolve(user);
                    } else {
                        reject("No matching user found");
                    }
                });
            });
        }
		
    }
	
};