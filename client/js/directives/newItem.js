angular.module('myApp').directive('newItem', function() {
  return {
    restrict: 'E',
    templateUrl: '../views/listings.html',
  }
});
