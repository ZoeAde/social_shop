angular.module('myApp').directive('topNavConstant', function() {
  return {
    restrict: 'E',
    templateUrl: '../partials/nav.html',
    controller: 'feedCtrl'
  };
});
