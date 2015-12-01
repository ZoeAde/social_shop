var app = angular.module('myApp', ['ngRoute', 'angularMoment', 'ngMessages', 'ngMaterial', 'duScroll', 'satellizer']);

app.config(function($routeProvider, $authProvider, $locationProvider, $mdIconProvider) {

    $mdIconProvider
      .icon('share-arrow', 'img/icons/share-arrow.svg', 24)
      .icon('upload', 'img/icons/upload.svg', 24)
      .icon('copy', 'img/icons/copy.svg', 24)
      .icon('print', 'img/icons/print.svg', 24)
      .icon('hangout', 'img/icons/hangout.svg', 24)
      .icon('mail', 'img/icons/mail.svg', 24)
      .icon('message', 'img/icons/message.svg', 24)
      .icon('copy2', 'img/icons/copy2.svg', 24)
      .icon('facebook', 'img/icons/facebook.svg', 24)
      .icon('twitter', 'img/icons/twitter.svg', 24);

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
