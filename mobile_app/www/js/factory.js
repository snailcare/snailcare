
angular.module('snailcareapp.factory', []).factory('AppFactory', function($http) {
	return {
		login: function(id, password){
			return $http({
				method: 'POST',
				url: 'http://localhost:3000/users/login',
				cache: false,
				data: {
					id: id,
					password: password
				}
			});
		}
	}
});
