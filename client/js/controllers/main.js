app.controller('mainController', ['$scope', 'instagram', 'myFactory', '$http', '$interval', '$location', '$routeParams', '$filter', '$document', '$window', '$auth', '$rootScope', function($scope, instagram, myFactory, $http, $interval, $location, $routeParams, $filter, $document, $window, $auth, $rootScope){

  $scope.getFeed = function() {
    // var instagramUrl = 'https://api.instagram.com/v1/users/' + instagram_id + '/media/recent/?client_id=311624c2f9f9454a9c7c053b234cc12a';
    console.log('inside get feed!');

    $http.get('http://localhost:5000/auth/api/feed').then(function (response) {
      $scope.photos = response.data;
    });
  };

  $scope.imageInfo = function() {
    $scope.newItemUrl = this.photo;
    console.log($scope.newItemUrl);
  }

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
        $location.path('/profile');
      })
      .catch(function(response) {
        console.log(response);
      });
    };

  $scope.logout = function() {
    $auth.logout();
    delete $window.localStorage.currentUser;
  };



}]);
