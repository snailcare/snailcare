angular.module('snailcareapp.controllers', ['snailcareapp.factory'])

  .controller('AppCtrl', function ($rootScope, $scope, $ionicModal, $ionicHistory, $ionicPopup, $timeout, $state, AppFactory, $ionicPlatform) {

    /**
     * initApp :: function
     * description: Main function that initializes the app
     */
    $scope.initApp = function () {  // defaults and inits
      $scope.socket = {};
	  $scope.loginData = {};
      $rootScope.user = null;
      $rootScope.userId = -1;
    };

    /**
     * login :: function
     * description: Login Handler function
     */
    $scope.login = function () {

      var userId = $scope.loginData.userId;
      var password = $scope.loginData.password;
      if (userId && password && userId.length > 0 && password.length > 0) {
        AppFactory.login(userId, password)
          .success(function (data) {
            if (data.status && data.is_exists) {
              $rootScope.userId = data.id;
              $rootScope.user = data.name;
			  localStorage.userId = $rootScope.userId;			  
			  $scope.initPreviousAppointments();
              $state.go('app.login');              
            }
            else {
              $rootScope.alertPopup("Incorrect Username or Password");
            }
          })
          .error(function (e) {
            console.error(e);
            $rootScope.alertPopup("Error Logging In");
          });
      }
      else {
        $rootScope.alertPopup("Please fill in these required fields");
      }
    };
	
	/**
     * logout :: function
     * description: Logs out the current user
     */
    $scope.logout = function () {
      $rootScope.userId = -1;
      $rootScope.user = null;
      $scope.loginData = {};
      $scope.tasks = [];
      localStorage.removeItem('userId');
      $rootScope.alertPopup("Logged out successfully");
	  
	  AppFactory.logout()
          .success(function (data) {            
			$state.go('app.login');
          })
          .error(function (e) {
            console.error(e);
            $state.go('app.login');
          });      
    };
	
	/**
     * initPreviousAppointments :: function
     * description: load previous appointments
     */
    $scope.initPreviousAppointments = function () {
	  AppFactory.getPreviousAppointmentsById($rootScope.userId)
          .success(function (data) {
			console.log(data); // to_remove
			$rootScope.previousAppointments = data.data;
          })
          .error(function (e) {
            console.error(e);
          });      
    };
	
	/**
     * alertPopup :: function
     * description: Generic function for Ionic Alert Popup
     */
    $rootScope.alertPopup = function (title, subtitle, callback) {
      var alertPopup = $ionicPopup.alert({
        title: title,
        template: subtitle,
        buttons: [
          {
            text: 'OK',
            type: 'button-assertive'
          }
        ]
      });

      alertPopup.then(function (res) {
        if (callback) {
          callback(res);
        }
      });
    };
	  
    // Trigger App on js load
    $scope.initApp();
  });
