app.controller('mainController', ['$scope', 'instagram', 'myFactory', '$http', '$interval', '$location', '$routeParams', '$filter', '$document', '$window', '$auth', '$rootScope', function($scope, instagram, myFactory, $http, $interval, $location, $routeParams, $filter, $document, $window, $auth, $rootScope){


  $scope.getFeed = function(instagram_id) {
    var instagramUrl = 'https://api.instagram.com/v1/users/' + instagram_id + '/media/recent/?client_id=311624c2f9f9454a9c7c053b234cc12a';

    $http.get('http://localhost:5000/auth/api/feed');
    // $http({
    //   method: 'GET',
    //   url: instagramUrl
    // }).then(function successCallback(response) {
    //     console.log('data:', response);
    //     // $scope.pics = data;
    //   }, function errorCallback(response) {
    //     console.log('http request error');
    //   });
  };


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



}]);
