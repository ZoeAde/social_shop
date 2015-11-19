var app = angular.module('myApp', ['ngRoute', 'angularMoment', 'ngMessages', 'duScroll', 'satellizer', 'ui.materialize']);

//creating different title name on each page in browser tab
app.run(['$rootScope', '$route', function($rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
}]);

app.config(function($routeProvider, $authProvider, $locationProvider) {

$authProvider.instagram({
    url: '/auth/instagram',
    clientId: '311624c2f9f9454a9c7c053b234cc12a',
    redirectUri: window.location.origin,
    scope: ['likes', 'comments', 'relationships', 'basic']
});

$routeProvider
    .when('/', {
      title: 'theMend',
      templateUrl: 'views/feed.html',
      controller: 'mainController'
    })
    .when('/profile', {
      title: 'My Profile',
      templateUrl: 'views/profile.html',
      controller: 'mainController'
    })
    .when('/jeet', {
      title: 'jeet test',
      templateUrl: 'views/jeet.html',
      controller: 'mainController'
    })
    .when('/listings', {
      title: 'Current Items Listed',
      templateUrl: 'views/listings.html',
      controller: 'mainController'
    })
    .when('/bids', {
      title: 'Current Items Bidding On',
      templateUrl: 'views/bids.html',
      controller: 'mainController'
    })
    .when('/wishlist', {
      title: 'Current Items Listed',
      templateUrl: 'views/wishlist.html',
      controller: 'mainController'
    })
    .otherwise({
      redirectTo: '/'
});

});
