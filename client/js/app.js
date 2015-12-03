var app = angular.module('myApp', ['ngRoute', 'angularMoment', 'ngMessages', 'ngMaterial', 'duScroll', 'satellizer']);

app.config(function($routeProvider, $authProvider, $locationProvider, $mdThemingProvider) {

$mdThemingProvider.theme('default')
    .primaryPalette('blue-grey', {
      'default': '900',
      'hue-1': '100',
      'hue-2': '600'
    })
    .accentPalette('purple', {
      'default': '200'
    });

$authProvider.instagram({
    url: '/auth/instagram',
    clientId: '311624c2f9f9454a9c7c053b234cc12a',
    redirectUri: window.location.origin,
    scope: ['likes', 'comments', 'relationships', 'basic']
});

$routeProvider
    .when('/', {
      title: 'theMend',
      templateUrl: 'views/profile.html',
      controller: 'mainController'
    })
    // .when('/listings', {
    //   title: 'Current Items Listed',
    //   templateUrl: 'views/listings.html',
    //   controller: 'mainController'
    // })
    // .when('/bids', {
    //   title: 'Current Items Bidding On',
    //   templateUrl: 'views/bids.html',
    //   controller: 'mainController'
    // })
    // .when('/wishlist', {
    //   title: 'Current Items Listed',
    //   templateUrl: 'views/wishlist.html',
    //   controller: 'mainController'
    // })
    .otherwise({
      redirectTo: '/'
});


});
