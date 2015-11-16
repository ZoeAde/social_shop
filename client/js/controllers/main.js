app.controller('mainController', function($scope, myFactory, $http, $location, $routeParams, $filter, $document, $window, $auth, $rootScope, $anchorScroll){

  $anchorScroll();

  // $scope.isAuthenticated = function() {
  //   return $auth.isAuthenticated();
  // };

  // $scope.logout = function() {
  //   $auth.logout();
  //   delete $window.localStorage.currentUser;
  // };

  $scope.toTheTop = function() {
    $document.scrollTopAnimated(0, 1400).then(function() {
    });
  };

  go = function(marker){
    $location.path(marker);
  };

  //helper functions
  // getPosts = function(url){
  //   myFactory.get(url)
  //     .then(function(res){
  //       $scope.posts = res.data;
  //       // console.log($scope.posts)
  //     });
  // };



  // $scope.addBlogPost = function(){
  //   myFactory.post('/api/posts', $scope.newPost)
  //     .then(function(data){
  //       var blog = data.data[0];
  //       go('/post/' + blog.lastName + '/' + blog.firstName);
  //     });
  //     // .then(function(res){
  //     //   $scope.posts.push(res.data);
  //     //   console.log($scope.posts);
  //     // });
  // };

});
