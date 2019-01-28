angular.module('snailcareapp.controllers', ['snailcareapp.factory'])

  .controller('AppCtrl', function ($rootScope, $scope, $ionicModal, $ionicHistory, $ionicPopup, $timeout, $state, AppFactory, $ionicPlatform) {

    /**
     * initApp :: function
     * description: Main function that initializes the app
     */
    $scope.initApp = function () {

      // defaults and inits
      $scope.socket = {};
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
            if (data.status) {
              $rootScope.userId = data.user._id;
              $rootScope.user = data.user;
              $state.go('app.login');

              localStorage.userId = $rootScope.userId;
              $rootScope.initTasks();
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

    // Trigger App on js load
    $scope.initApp();
  });
