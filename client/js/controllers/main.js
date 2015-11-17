app.controller('mainController', function($scope, myFactory, $http, $location, $routeParams, $filter, $document, $window, $auth, $rootScope, $anchorScroll){

  $anchorScroll();

  $scope.isAuthenticated = function() {
    return $auth.isAuthenticated();
  };

  $scope.logout = function() {
    $auth.logout();
    delete $window.localStorage.currentUser;
  };

  $scope.linkInstagram = function() {
      $auth.link('instagram')
        .then(function(response) {
          $window.localStorage.currentUser = JSON.stringify(response.data.user);
          $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
        });
    };

  $scope.toTheTop = function() {
    $document.scrollTopAnimated(0, 1400).then(function() {
    });
  };

  go = function(marker){
    $location.path(marker);
  };

});
