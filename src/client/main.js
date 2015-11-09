'use strict'

var myApp = angular.module('myApp', ['ngRoute', 'ngMaterial']);

myApp.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/home.html'
    })
    .otherwise({redirectTo: '/'});
}]);
