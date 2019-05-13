
angular.module('snailcareapp.factory', []).factory('AppFactory', function($http) {
	return {
		login: function(id, password){
			return $http({
				method: 'POST',
				url: 'https://snailcare.herokuapp.com/users/login',
				cache: false,
				data: {
					id: id,
					password: password
				}
			});
		},
		
		logout: function () {
		return $http({ // ajax http call
		  method: 'POST',
		  url: 'https://snailcare.herokuapp.com/users/logout',
		  cache: false,
		  data: {				
		  }
		});
	  }
	  
	}
});
