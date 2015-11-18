app.controller('mainController', function($scope, myFactory, $http, $location, $routeParams, $filter, $document, $window, $auth, $rootScope, $anchorScroll){

  $anchorScroll();
  $scope.token = "";
  $scope.isAuthenticated = function() {
    return $auth.isAuthenticated();
  };
$scope.authenticate = function(provider) {

    $auth.authenticate(provider)
      .then(function(response) {
        $window.localStorage.currentUser = JSON.stringify(response.data.user);
        $rootScope.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        console.log($rootScope.currentUser.isFulfilled);
        $rootScope.user = response.data.user;
        console.log('user is...', $rootScope.user);
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

  // $scope.toTheTop = function() {
  //   $document.scrollTopAnimated(0, 1400).then(function() {
  //   });
  // };

  // go = function(marker){
  //   $location.path(marker);
  // };

});
