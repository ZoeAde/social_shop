app.config(function($routeProvider, $locationProvider, $authProvider){
  $routeProvider
    .when('/', {
      title: 'theMend',
      templateUrl: 'views/feed.html',
      controller: 'mainController'
    })
    .when('/profile', {
      title: 'User Profile',
      templateUrl: 'views/profile.html',
      controller: 'profileController'
    })
    .otherwise({
      redirectTo: '/'
    });

    $locationProvider.html5Mode(true);
});
