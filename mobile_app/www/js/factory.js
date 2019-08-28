
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
		},
		
		getPreviousAppointmentsById: function(id) {
			return $http({
				method: 'POST',
				url: 'https://snailcare.herokuapp.com/appointments/get_previous_appointments_by_id',
				cache: false,
				data: {
					id: id
				}
			});
		},
		
		getNextAppointmentsById: function(id) {
			return $http({
				method: 'POST',
				url: 'https://snailcare.herokuapp.com/appointments/get_next_appointments_by_id',
				cache: false,
				data: {
					id: id
				}
			});
		},
		
		removeAppointment: function(data) {
			return $http({
				method: 'POST',
				url: 'https://snailcare.herokuapp.com/appointments/remove_appointment',
				cache: false,
				data: {
					staffId: data.staff_id,
					date: data.date,
					hour: data.hour,
					id: data.id
				}
			});
		}
	  
	}
});
