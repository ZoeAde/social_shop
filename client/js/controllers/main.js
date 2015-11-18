app.controller('mainController', ['$scope', 'instagram', 'myFactory', '$http', '$interval', '$location', '$routeParams', '$filter', '$document', '$window', '$auth', '$rootScope', function($scope, instagram, myFactory, $http, $interval, $location, $routeParams, $filter, $document, $window, $auth, $rootScope){

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
  $scope.layout = 'grid';

    $scope.setLayout = function(layout){
        $scope.layout = layout;
    };

    $scope.isLayout = function(layout){
        return $scope.layout == layout;
    };

  $scope.pics = [];

  // Usamos el servicio q construimos
  instagram.fetchPopular(function(data){

    $scope.pics = data;
  });


}]);
