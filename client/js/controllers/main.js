app.controller('mainController', function($scope, myFactory, $http, $interval, instagram, $location, $routeParams, $filter, $document, $window, $auth, $rootScope, $anchorScroll){

  $anchorScroll();

  $scope.isAuthenticated = function() {
    return $auth.isAuthenticated();
  };

  $scope.authenticate = function(provider) {

    $auth.authenticate(provider)
      .then(function(response) {
        $window.localStorage.currentUser = JSON.stringify(response.data.user);
        $rootScope.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        $rootScope.user = response.data.user;
        $rootScope.token = response.data.token;
        console.log($rootScope.token);
        $location.path('/home');
      })
    .catch(function(response) {
      console.log(response);
    });
  };

  $scope.logout = function() {
    $auth.logout();
    delete $window.localStorage.currentUser;
  };

  // go = function(marker){
  //   $location.path(marker);
  // };


});
