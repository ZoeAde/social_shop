'use strict'

var myApp = angular.module('myApp', ['ngRoute', 'ngMaterial'])

  .config(['$routeProvider', function ($routeProvider) {

    // $mdIconProvider.iconSet("avatar", 'icons/avatar-icons.svg', 128);

    $routeProvider
      .when('/', {
        templateUrl: 'partials/home.html'
      })
      .when('/feed', {
          templateUrl: 'partials/feed.html',
          controller: 'MainCtrl'
      })
      .when('/form', {
          templateUrl: 'partials/form.html',
          controller: 'MainCtrl'
      })
      .when('/profile', {
          templateUrl: 'partials/profile.html',
          controller: 'MainCtrl'
      })
      .otherwise({redirectTo: '/'});
  }]);
