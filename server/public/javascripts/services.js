(function (app) {
  // create users factory
  app.factory('Factory', ['$http', '$q', function ($http, $q) {
    return {
		
      loginUser: function (id, password) {
        return $http({ // ajax http call
          method: 'POST',
          url: serverUrl + 'users/login',
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
		  url: serverUrl + 'users/logout',
		  cache: false,
		  data: {				
		  }
		});
	  },
	
	 getAreas: function () {
		return $http({ // ajax http call
		  method: 'POST',
		  url: serverUrl + 'area/get_areas',
		  cache: false,
		  data: {				
		  }
		});
	  },
	  
	  getClients: function () {
		return $http({ // ajax http call
		  method: 'POST',
		  url: serverUrl + 'users/get_clients',
		  cache: false,
		  data: {				
		  }
		});
	  },
	  
	  getStaffs: function () {
		return $http({ // ajax http call
		  method: 'POST',
		  url: serverUrl + 'staffs/get_staffs',
		  cache: false,
		  data: {				
		  }
		});
	  },
	  
	  getDeletedClients: function () {
		return $http({ // ajax http call
		  method: 'POST',
		  url: serverUrl + 'users/get_deleted_clients',
		  cache: false,
		  data: {				
		  }
		});
	  },
	  
	  getBranches: function () {
		return $http({ // ajax http call
		  method: 'POST',
		  url: serverUrl + 'branches/get_branches',
		  cache: false,
		  data: {				
		  }
		});
	  },
	  
	  getProfessions: function () {
		return $http({ // ajax http call
		  method: 'POST',
		  url: serverUrl + 'staffs/get_professions',
		  cache: false,
		  data: {				
		  }
		});
	  },
	  
      addBranch: function (data) {
        return $http({ // ajax http call
          method: 'POST',
          url: serverUrl + 'branches/add_branch',
          cache: false,
          data: {
            branchName: data.branchName,
            areaCode: data.areaCode
          }
        });
      },
	  
	  updateBranch: function (data) {
        return $http({ // ajax http call
          method: 'POST',
          url: serverUrl + 'branches/update_branch',
          cache: false,
          data: {
            branchName: data.newBranchName,
            areaCode: data.newAreaCode,
			oldBranchName: data.branchName
          }
        });
      },
	  
	  addClient: function (data) {
        return $http({ // ajax http call
          method: 'POST',
          url: serverUrl + 'users/add_client',
          cache: false,
          data: {
            id: data.id,
            firstName: data.firstName,
			lastName: data.lastName,
			address: data.address,
			phoneNumber: data.phoneNumber,
			email: data.email,
			password: data.password
          }
        });
      },
	  
	  removeClient: function (data) {
        return $http({ // ajax http call
          method: 'POST',
          url: serverUrl + 'users/remove_client',
          cache: false,
          data: {
            id: data         
          }
        });
      },
	  
	  updateClient: function (data) {
        return $http({ // ajax http call
          method: 'POST',
          url: serverUrl + 'users/update_client',
          cache: false,
          data: {			
			id: data.id,
			firstName: data.newFirstName,
			lastName: data.newLastName,
			phoneNumber: data.newPhoneNumber,
			address: data.newAddress,
			email: data.newEmail
          }
        });
      },
	  
	  updateStaff: function (data) {
        return $http({ // ajax http call
          method: 'POST',
          url: serverUrl + 'staffs/update_staff',
          cache: false,
          data: {			
			id: data.id,
			firstName: data.newFirstName,
			lastName: data.newLastName,
			phoneNumber: data.newPhoneNumber,
			personalInformation: data.newPersonalInformation,
			branchCode: data.newBranchCode,
			professionCode: data.newProfessionCode
          }
        });
      },	  
	 
	  setIsActiveClient: function (data) {
        return $http({ // ajax http call
          method: 'POST',
          url: serverUrl + 'users/set_is_active_client',
          cache: false,
          data: {			
			id: data.id		
          }
        });
      },
	  
	  addStaff: function (data) {
        return $http({ // ajax http call
          method: 'POST',
          url: serverUrl + 'staffs/add_staff',
          cache: false,
          data: {
            id: data.id,
            firstName: data.firstName,
			lastName: data.lastName,
			address: data.address,
			phoneNumber: data.phoneNumber,
			email: data.email,
			password: data.password,
			personalInfo: data.personalInfo,
			branch: data.branch,
			profession: data.profession
          }
        });
      }
	  
    }
  }]);
})(app || {});