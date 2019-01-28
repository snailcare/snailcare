// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('snailcareapp', ['ionic', 'snailcareapp.controllers', 'snailcareapp.factory'])

  .run(function ($ionicPlatform,$rootScope,$state,AppFactory) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
      if ((!$rootScope.userId || $rootScope.userId === -1) && $state.$current !== 'app.login') {
        console.log('unknown user, referring...');
        $state.go('app.login');
		
        // if localStorage holds a userId -> user has been previously logged -> log the user in
        if (localStorage.userId) {
          $rootScope.userId = localStorage.userId;
          console.log('Found userId in localStorage: ' + $rootScope.userId);
          AppFactory.loginUserById($rootScope.userId)
            .success(function (data) {
              
              if (data.status) {
                $rootScope.user = data.user;
                $rootScope.autoLoginMsg = "Hello " + $rootScope.user.userName + ", You have been logged in automatically";
                $state.go('app.login');
                $rootScope.initTasks();
              }
              else { // user not found, refer to login
                $rootScope.userId = -1;
                $state.go('app.login');
              }
            })
        }

        // get host and port defaults from localStorage if exists
        if (localStorage.host) {
          $rootScope.host = localStorage.host;
        }

        if (localStorage.port) {
          $rootScope.port = localStorage.port;
        }
      }
    });
  })

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
      })
      .state('app.login', {
        url: '/login',
        views: {
          'menuContent': {
            templateUrl: 'templates/login.html'
          }
        },
        controller: 'AppCtrl'
      })      
      .state('app.about', {
        url: '/about',
        views: {
          'menuContent': {
            templateUrl: 'templates/about.html'
          }
        },
        controller: 'AppCtrl'
      });
      
    // if none of the above states are matched, use this as the fallback
    //$urlRouterProvider.otherwise('/app/login');
  });
