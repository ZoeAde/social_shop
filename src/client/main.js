'use strict'

var myApp = angular.module('myApp', ['ngRoute', 'ngMaterial'])

.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/home.html',
      controller: 'mainControler'
    })
    .when('/form', {
      templateUrl: 'partials/form.html',
      controller: 'DemoCtrl'
    })
    .otherwise({redirectTo: '/'});
}]);
